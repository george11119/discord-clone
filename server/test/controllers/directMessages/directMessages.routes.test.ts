import supertest from "supertest"
import { server } from "../../../src/app"
import testHelpers, { dbSetupAndTeardown } from "../../helpers"
import { beforeEach, describe, expect, it } from "@jest/globals"
import { User } from "../../../src/models/user"
import { Channel } from "../../../src/models/channel"
import jwtUtils from "../../../src/utils/jwtUtils"
import { DirectMessage } from "../../../src/models/directMessage"
import { ChannelType } from "../../../../types"
import { createInverseDirectMessage } from "../../../src/controllers/helpers"

const api = supertest(server)
const url = "/api/channels/@me"

dbSetupAndTeardown()

describe(`${url}`, () => {
  beforeEach(async () => {
    await User.delete({})
    await Channel.delete({})
    await DirectMessage.delete({})

    for (let i = 1; i <= 5; i++) {
      await testHelpers.generateUser({
        username: `testusername${i}`,
        password: "password", // password is "password"
        email: `test${i}@test.com`,
      })
    }
    const user3 = await User.findOne({ where: { username: "testusername3" } })
    const user4 = await User.findOne({ where: { username: "testusername4" } })
    const user5 = await User.findOne({ where: { username: "testusername5" } })

    const channel1 = await Channel.save({
      name: "user3 user4",
      channelType: ChannelType.DIRECT_MESSAGE,
    })
    const channel2 = await Channel.save({
      name: "user3 user5",
      channelType: ChannelType.DIRECT_MESSAGE,
    })
    const channel3 = await Channel.save({
      name: "user4 user5",
      channelType: ChannelType.DIRECT_MESSAGE,
    })

    const directMessageRelation1 = await DirectMessage.save({
      ownerId: user3?.id,
      recepientId: user4?.id,
      channelId: channel1.id,
    })
    await createInverseDirectMessage(directMessageRelation1)

    const directMessageRelation2 = await DirectMessage.save({
      ownerId: user3?.id,
      recepientId: user5?.id,
      channelId: channel2.id,
    })
    await createInverseDirectMessage(directMessageRelation2)

    const directMessageRelation3 = await DirectMessage.save({
      ownerId: user4?.id,
      recepientId: user5?.id,
      channelId: channel3.id,
    })
    await createInverseDirectMessage(directMessageRelation3)
  })

  describe(`GET ${url}`, () => {
    it("Returns 401 if user is not logged in", async () => {
      await api.get(`${url}`).expect(401)
    })

    it("Returns all direct message relations the user owns along with attached channels and users", async () => {
      const user3 = await User.findOne({ where: { username: "testusername3" } })
      const token = jwtUtils.signToken({ userId: user3?.id as string })

      const res = await api
        .get(`${url}`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const directMessageRelations = res.body
      for (const directMessageRelation of directMessageRelations) {
        expect(directMessageRelation.channel.id).toBeTruthy()
        expect(directMessageRelation.recepient.id).toBeTruthy()
        expect(directMessageRelation.ownerId).toBe(user3?.id)
      }
    })
  })

  describe(`POST ${url}`, () => {
    it("Returns 401 if user is not logged in", async () => {
      await api.post(`${url}`).expect(401)
    })

    it("Returns 400 if user already has a direct message relation with the recepient and tries to create another one", async () => {
      const user1 = await User.findOne({ where: { username: "testusername1" } })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOne({ where: { username: "testusername2" } })
      const payload = { recepient: user2 }

      const channel = await Channel.save({
        name: "tacos",
        channelType: ChannelType.DIRECT_MESSAGE,
      })
      await DirectMessage.save({
        ownerId: user1?.id,
        recepientId: user2?.id,
        channelId: channel.id,
      })

      await api
        .post(`${url}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Returns 400 if user tries to create a direct message with a non existent user", async () => {
      const user1 = await User.findOne({ where: { username: "testusername1" } })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOne({ where: { username: "testusername2" } })
      await User.delete({ id: user2?.id })
      const payload = { recepient: user2 }

      const initialDirectMessages = await DirectMessage.count()

      await api
        .post(`${url}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)

      const finalDirectMessages = await DirectMessage.count()
      expect(initialDirectMessages).toBe(finalDirectMessages)
    })

    it("Creates a new channel for sending direct messages and a one sided relationship if one doesnt exist", async () => {
      const user1 = await User.findOne({ where: { username: "testusername1" } })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOne({ where: { username: "testusername2" } })
      const payload = { recepient: user2 }

      const res = await api
        .post(`${url}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const directMessageRelation: DirectMessage = res.body

      expect(directMessageRelation.ownerId).toBe(user1?.id)
      expect(directMessageRelation.recepientId).toBe(user2?.id)
      expect(directMessageRelation.channelId).toBeTruthy()
      const channel = await Channel.findOne({
        where: { id: directMessageRelation.channelId },
      })
      expect(channel).toBeTruthy()
    })

    it("Returns a already created channel if a inverse direct message relation already exists", async () => {
      const user1 = await User.findOne({ where: { username: "testusername1" } })
      const user2 = await User.findOne({ where: { username: "testusername2" } })

      const channel = await Channel.save({
        name: "tacos",
        channelType: ChannelType.DIRECT_MESSAGE,
      })
      await DirectMessage.save({
        ownerId: user2?.id,
        recepientId: user1?.id,
        channelId: channel.id,
      })

      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { recepient: user2 }

      const res = await api
        .post(`${url}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const directMessageRelation: DirectMessage = res.body

      expect(directMessageRelation.ownerId).toBe(user1?.id)
      expect(directMessageRelation.recepientId).toBe(user2?.id)
      expect(directMessageRelation.channelId).toBe(channel.id)
    })
  })
})
