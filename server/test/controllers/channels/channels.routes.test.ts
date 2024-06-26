import supertest from "supertest"
import { server } from "../../../src/app"
import testHelpers, { dbSetupAndTeardown } from "../../helpers"
import { beforeEach, describe, expect, it } from "@jest/globals"
import { User } from "../../../src/models/user"
import { Server } from "../../../src/models/server"
import { Channel } from "../../../src/models/channel"
import jwtUtils from "../../../src/utils/jwtUtils"

const api = supertest(server)
const url = "/api/channels"

dbSetupAndTeardown()

describe(`${url}`, () => {
  beforeEach(async () => {
    await Server.delete({})
    await User.delete({})
    await Channel.delete({})

    // user 1 creation
    const user1 = await testHelpers.generateUser({
      username: "testusername1",
      password: "password", // password is "password"
      email: "test1@test.com",
    })

    const user1Server = await testHelpers.generateServer({
      user: user1,
      name: "User 1's Server",
    })

    // user 1 owns a server with 2 channels
    for (let i = 1; i <= 2; i++) {
      await testHelpers.generateChannel({
        name: `Channel ${i}`,
        server: user1Server,
      })
    }

    // user 2 creation
    const user2 = await testHelpers.generateUser({
      username: "testusername2",
      password: "password", // password is "password"
      email: "test2@test.com",
    })

    const user2Server = await testHelpers.generateServer({
      user: user2,
      name: "User 2's Server",
    })

    // user 2 owns a server with 4 channels
    for (let i = 1; i <= 4; i++) {
      await testHelpers.generateChannel({
        name: `Channel ${i}`,
        server: user2Server,
      })
    }
  })

  describe(`GET ${url}/:serverId`, () => {
    it("Does not return a list of channels for a given server if user is not authenticated", async () => {
      const server = await Server.findOneBy({ name: "User 1's Server" })
      await api.get(`${url}/${server?.id}`).expect(401)
    })

    it("Does not return a list of channels for a given server if user is not in the given server", async () => {
      // pretend to be user 1
      const user = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user?.id as string })

      // server of user 2
      const server = await Server.findOneBy({ name: "User 2's Server" })
      await api
        .get(`${url}/${server?.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns a list of channels for a given server if user is in the given server", async () => {
      // pretend to be user 1
      const user = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user?.id as string })

      const server = await Server.findOneBy({ name: "User 1's Server" })
      const res = await api
        .get(`${url}/${server?.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const channels = res.body
      expect(channels.length).toBe(2)

      const [channel] = channels
      expect(channel.name).toBeTruthy()
    })
  })

  describe(`POST ${url}/:serverId`, () => {
    it("Returns 400 if user invalid serverId given", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "New channel 1" }

      await api
        .post(`${url}/asdf`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Doesnt allow a unauthenticated user to create a new channel", async () => {
      const server = await Server.findOne({
        where: { name: "User 1's Server" },
      })
      const payload = { name: "New channel 1" }

      await api
        .post(`${url}/${server?.id}`)
        .send(payload)
        .expect(401)
    })

    it("Doesnt allow a user who isnt in the server to create a channel", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "New channel 1" }

      const server = await Server.findOne({
        where: { name: "User 2's Server" },
      })

      // attempt to add a channel in user 2's server
      await api
        .post(`${url}/${server?.id}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 401 if no server is found", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "New channel 1" }

      await api
        .post(`${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 201 and creates channel if server exists and user is in server", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "New channel 1" }

      const server = await Server.findOne({
        where: { name: "User 1's Server" },
        relations: {
          channels: true,
        },
      })

      const initialServerCount = server?.channels.length as number
      expect(initialServerCount).toBe(2)

      const res = await api
        .post(`${url}/${server?.id}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const channel = res.body
      expect(channel.name).toBe("New channel 1")

      const updatedServer = await Server.findOne({
        where: { name: "User 1's Server" },
        relations: {
          channels: true,
        },
      })
      const finalServerCount = updatedServer?.channels.length
      expect(finalServerCount).toBe(initialServerCount + 1)
    })
  })

  describe(`PATCH ${url}/:serverId/:channelId`, () => {
    it("Returns 400 if invalid serverId or invalid channelId is given", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "Updated channel 1" }

      await api
        .patch(`${url}/asdf/asdf`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Doesnt allow an unauthenticated user to update a channel", async () => {
      const server = await Server.findOne({
        where: { name: "User 1's Server" },
        relations: {
          channels: true,
        },
      })
      const payload = { name: "Updated channel 1" }

      await api
        .patch(`${url}/${server?.id}/${server?.channels[0].id}`)
        .send(payload)
        .expect(401)
    })

    it("Doesnt allow a user who isnt in the server to update a channel", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "Updated channel 1" }

      const server = await Server.findOne({
        where: { name: "User 2's Server" },
        relations: {
          channels: true,
        },
      })

      // attempt to add a channel in user 2's server
      await api
        .patch(`${url}/${server?.id}/${server?.channels[0].id}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 401 if no server or channel is found", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "Updated channel 1" }

      await api
        .patch(
          `${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8/d063e5e8-446a-480f-bc8b-83c0ad33f1a8`,
        )
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 200 and updates channel if server and channel exists and user is in server", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "Updated channel 1" }

      const server = await Server.findOne({
        where: { name: "User 1's Server" },
        relations: {
          channels: true,
        },
      })

      expect(server?.channels[0].name).not.toBe("Updated channel 1")

      const res = await api
        .patch(`${url}/${server?.id}/${server?.channels[0].id}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const channel = res.body
      expect(channel.name).toBe("Updated channel 1")

      const updatedServer = await Server.findOne({
        where: { name: "User 1's Server" },
        relations: {
          channels: true,
        },
      })

      const updatedChannel = updatedServer?.channels.find(
        (channel) => channel.name === "Updated channel 1",
      )
      expect(updatedChannel).toBeTruthy()
    })
  })

  describe(`DELETE ${url}/:serverId/:channelId`, () => {
    it("Returns 400 if invalid serverId or channelId is given", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .delete(`${url}/asdf/asdf`)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Returns 401 if user is not logged in", async () => {
      const server = await Server.findOne({
        where: { name: "User 1's Server" },
        relations: {
          channels: true,
        },
      })

      await api
        .delete(`${url}/${server?.id}/${server?.channels[0].id}`)
        .expect(401)
    })

    it("Returns 401 if user is not in the server they are trying to delete from", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const server = await Server.findOne({
        where: { name: "User 2's Server" },
        relations: {
          channels: true,
        },
      })

      // attempt to add a channel in user 2's server
      await api
        .delete(`${url}/${server?.id}/${server?.channels[0].id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 401 if no server or channel is found", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .delete(
          `${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8/d063e5e8-446a-480f-bc8b-83c0ad33f1a8`,
        )
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Deletes channel if user is in the server that the channel is in", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const server = await Server.findOne({
        where: { name: "User 1's Server" },
        relations: {
          channels: true,
        },
      })

      expect(server?.channels.length).toBe(2)

      await api
        .delete(`${url}/${server?.id}/${server?.channels[0].id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(204)

      const updatedServer = await Server.findOne({
        where: { name: "User 1's Server" },
        relations: {
          channels: true,
        },
      })

      expect(updatedServer?.channels.length).toBe(1)
    })
  })
})
