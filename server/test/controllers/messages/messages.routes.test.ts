import supertest from "supertest"
import { server } from "../../../src/app"
import testHelpers, { dbSetupAndTeardown } from "../../helpers"
import { beforeEach, describe, expect, it } from "@jest/globals"
import { User } from "../../../src/models/user"
import { Server } from "../../../src/models/server"
import { Channel } from "../../../src/models/channel"
import { Message } from "../../../src/models/message"
import jwtUtils from "../../../src/utils/jwtUtils"
import { ChannelType } from "../../../../types"
import { DirectMessage } from "../../../src/models/directMessage"
import { createInverseDirectMessage } from "../../../src/controllers/helpers"

const api = supertest(server)
const url = "/api/messages"

dbSetupAndTeardown()

describe(`${url}`, () => {
  beforeEach(async () => {
    await DirectMessage.delete({})
    await Channel.delete({})
    await Message.delete({})
    await Server.delete({})
    await User.delete({})

    const user1 = await testHelpers.generateUser({
      username: "testusername1",
      password: "password",
      email: "test1@test.com",
    })

    const user1Server = await testHelpers.generateServer({
      name: "User 1's Server",
      user: user1,
    })

    const channel1 = await testHelpers.generateChannel({
      name: "testusername1's Channel",
      server: user1Server,
    })

    for (let i = 1; i <= 5; i++) {
      await testHelpers.generateMessage({
        content: `Hello ${i}`,
        user: user1,
        channel: channel1,
      })
    }

    const user2 = await testHelpers.generateUser({
      username: "testusername2",
      password: "password",
      email: "test2@test.com",
    })

    const user2Server = await testHelpers.generateServer({
      name: "User 2's Server",
      user: user2,
    })

    await testHelpers.generateChannel({
      name: "testusername2's Channel",
      server: user2Server,
    })

    const user3 = await testHelpers.generateUser({
      username: "testusername3",
      password: "password",
      email: "test3@test.com",
    })

    const directMessageChannel = await Channel.save({
      name: "user1 user3",
      channelType: ChannelType.DIRECT_MESSAGE,
    })

    const directMessageRelation1 = await DirectMessage.save({
      ownerId: user1?.id,
      recepientId: user3?.id,
      channelId: directMessageChannel.id,
    })
    await createInverseDirectMessage(directMessageRelation1)

    for (let i = 1; i <= 3; i++) {
      await testHelpers.generateMessage({
        content: `Hello ${i}`,
        user: user1,
        channel: directMessageChannel,
      })
    }
  })

  describe(`GET ${url}/:channelId`, () => {
    it("Does not return a list of messages for a given channel if user is not authenticated", async () => {
      const channel = await Channel.findOneBy({
        name: "testusername1's Channel",
      })
      await api.get(`${url}/${channel?.id}`).expect(401)
    })

    describe("If channel belongs to a server", () => {
      it("Does not return a list of messages for a given channel if user is not in the server that the channel is in", async () => {
        const user = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user?.id as string })

        const channel = await Channel.findOneBy({
          name: "testusername2's Channel",
        })

        await api
          .get(`${url}/${channel?.id}`)
          .set("authorization", `Bearer ${token}`)
          .expect(401)
      })

      it("Returns a list of messages in the given server if user is in the server that the channel is in", async () => {
        const user = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user?.id as string })

        const channel = await Channel.findOneBy({
          name: "testusername1's Channel",
        })

        const res = await api
          .get(`${url}/${channel?.id}`)
          .set("authorization", `Bearer ${token}`)
          .expect(200)

        const messages = res.body
        expect(messages.length).toBe(5)

        const [message] = messages
        expect(message.content).toBeTruthy()

        const messageOwner = message.user
        expect(messageOwner.username).toBe(user?.username)
      })
    })

    describe("If channel is a direct messages channel", () => {
      it("Does not return a list of messages for a given channel if user does not have a direct message relation that the channel is in", async () => {
        const user = await User.findOneBy({ username: "testusername2" })
        const token = jwtUtils.signToken({ userId: user?.id as string })

        const channel = await Channel.findOneBy({
          name: "user1 user3",
        })

        await api
          .get(`${url}/${channel?.id}`)
          .set("authorization", `Bearer ${token}`)
          .expect(401)
      })

      it("Returns a list of messages in the given server if user has a direct message relation containing then given channel", async () => {
        const user = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user?.id as string })

        const channel = await Channel.findOneBy({
          name: "user1 user3",
        })

        const res = await api
          .get(`${url}/${channel?.id}`)
          .set("authorization", `Bearer ${token}`)
          .expect(200)

        const messages = res.body
        expect(messages.length).toBe(3)

        const [message] = messages
        expect(message.content).toBeTruthy()

        const messageOwner = message.user
        expect(messageOwner.username).toBe(user?.username)
      })
    })
  })

  describe(`POST ${url}/:channelId`, () => {
    it("Returns 400 if invalid channelId is given", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { content: "newly sent message" }

      await api
        .post(`${url}/asdf`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Doesnt allow a unauthenticated user to send a message", async () => {
      const channel = await Channel.findOne({
        where: {
          name: "testusername1's Channel",
        },
      })
      const payload = { content: "newly sent message" }

      await api
        .post(`${url}/${channel?.id}`)
        .send(payload)
        .expect(401)
    })

    it("Returns 404 if no channel exists", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { content: "newly sent message" }

      await api
        .post(`${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(404)
    })

    describe("If channel belongs to a server", () => {
      it("Returns 401 if user is not in the server of the given channel", async () => {
        const user3 = await User.findOneBy({ username: "testusername3" })
        const token = jwtUtils.signToken({ userId: user3?.id as string })
        const channel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })
        const payload = { content: "newly sent message" }

        const initialMessageCount = channel?.messages.length as number
        expect(initialMessageCount).toBe(5)

        await api
          .post(`${url}/${channel?.id}`)
          .send(payload)
          .set("authorization", `Bearer ${token}`)
          .expect(401)

        const updatedChannel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })

        expect(updatedChannel?.messages.length).toBe(initialMessageCount)
      })

      it("Returns 201 and creates message if channel exists and user is in server that channel is in", async () => {
        const user1 = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user1?.id as string })
        const channel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })
        const payload = { content: "newly sent message" }

        const initialMessageCount = channel?.messages.length as number
        expect(initialMessageCount).toBe(5)

        const res = await api
          .post(`${url}/${channel?.id}`)
          .send(payload)
          .set("authorization", `Bearer ${token}`)
          .expect(201)
          .expect("Content-Type", /application\/json/)

        const message = res.body
        expect(message.content).toBe("newly sent message")

        const updatedChannel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })
        expect(updatedChannel?.messages.length).toBe(initialMessageCount + 1)

        const newMessage = updatedChannel?.messages.find(
          (message) => message.content === "newly sent message",
        )
        expect(newMessage).toBeTruthy()
      })
    })

    describe("If channel is a direct message channel", () => {
      it("Returns 401 if user does not have a direct message relation in the given channel", async () => {
        const user2 = await User.findOneBy({ username: "testusername2" })
        const token = jwtUtils.signToken({ userId: user2?.id as string })
        const channel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })
        const payload = { content: "newly sent message" }

        const initialMessageCount = channel?.messages.length as number
        expect(initialMessageCount).toBe(3)

        await api
          .post(`${url}/${channel?.id}`)
          .send(payload)
          .set("authorization", `Bearer ${token}`)
          .expect(401)

        const updatedChannel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })

        expect(updatedChannel?.messages.length).toBe(initialMessageCount)
      })

      it("Returns 201 if user has a direct message relation in the given channel", async () => {
        const user1 = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user1?.id as string })
        const channel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })
        const payload = { content: "newly sent message" }

        const initialMessageCount = channel?.messages.length as number
        expect(initialMessageCount).toBe(3)

        const res = await api
          .post(`${url}/${channel?.id}`)
          .send(payload)
          .set("authorization", `Bearer ${token}`)
          .expect(201)
          .expect("Content-Type", /application\/json/)

        const message = res.body
        expect(message.content).toBe("newly sent message")

        const updatedChannel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })
        expect(updatedChannel?.messages.length).toBe(initialMessageCount + 1)

        const newMessage = updatedChannel?.messages.find(
          (message) => message.content === "newly sent message",
        )
        expect(newMessage).toBeTruthy()
      })
    })
  })

  describe(`PATCH ${url}/:channelId/:messageId`, () => {
    it("Returns 400 if invalid channelId or messageId is given", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { content: "updated message" }

      await api
        .patch(`${url}/asdf/asdf`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Doesnt allow an unauthenticated user to update a message", async () => {
      const channel = await Channel.findOne({
        where: {
          name: "testusername1's Channel",
        },
        relations: { messages: true },
      })
      const initialMessageCount = channel?.messages.length
      const message = channel?.messages[0]
      const payload = { content: "updated message" }

      await api
        .patch(`${url}/${channel?.id}/${message?.id}`)
        .send(payload)
        .expect(401)

      const updatedChannel = await Channel.findOne({
        where: {
          name: "testusername1's Channel",
        },
        relations: { messages: true },
      })
      const finalMessageCount = updatedChannel?.messages.length
      expect(finalMessageCount).toBe(initialMessageCount)
    })

    it("Doesnt allow a user who isnt in the channel to update a message", async () => {
      const user = await User.findOneBy({ username: "testusername2" })
      const token = jwtUtils.signToken({ userId: user?.id as string })

      const channel = await Channel.findOne({
        where: {
          name: "testusername1's Channel",
        },
        relations: { messages: true },
      })
      const initialMessageCount = channel?.messages.length
      const message = channel?.messages[0]
      const payload = { content: "updated message" }

      await api
        .patch(`${url}/${channel?.id}/${message?.id}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(401)

      const updatedChannel = await Channel.findOne({
        where: {
          name: "testusername1's Channel",
        },
        relations: { messages: true },
      })
      const finalMessageCount = updatedChannel?.messages.length
      expect(finalMessageCount).toBe(initialMessageCount)
    })

    it("Returns 404 if no channel or message is found", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { content: "updated message" }

      await api
        .patch(
          `${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8/d063e5e8-446a-480f-bc8b-83c0ad33f1a8`,
        )
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(404)
    })

    describe("If channel is a server channel", () => {
      it("Returns 401 if user is not in the server the channel is in", async () => {
        const user3 = await User.findOneBy({ username: "testusername3" })
        const token = jwtUtils.signToken({ userId: user3?.id as string })
        const payload = { content: "updated message" }

        const channel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })

        await api
          .patch(`${url}/${channel?.id}/${channel?.messages[0].id}`)
          .send(payload)
          .set("authorization", `Bearer ${token}`)
          .expect(401)

        const updatedChannel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })

        const updatedMessage = updatedChannel?.messages.find(
          (message) => message.content === "updated message",
        )
        expect(updatedMessage).toBeFalsy()
      })

      it("Returns 200 and updates message if user is in channel and message exists", async () => {
        const user1 = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user1?.id as string })
        const payload = { content: "updated message" }

        const channel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })

        const res = await api
          .patch(`${url}/${channel?.id}/${channel?.messages[0].id}`)
          .send(payload)
          .set("authorization", `Bearer ${token}`)
          .expect(200)

        const message = res.body
        expect(message.content).toBe("updated message")

        const updatedChannel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })

        const updatedMessage = updatedChannel?.messages.find(
          (message) => message.content === "updated message",
        )
        expect(updatedMessage).toBeTruthy()
      })
    })

    describe("If channel is a direct message channel", () => {
      it("Returns 401 if user does not have a direct message relationship with given channel", async () => {
        const user2 = await User.findOneBy({ username: "testusername2" })
        const token = jwtUtils.signToken({ userId: user2?.id as string })
        const payload = { content: "updated message" }

        const channel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })

        await api
          .patch(`${url}/${channel?.id}/${channel?.messages[0].id}`)
          .send(payload)
          .set("authorization", `Bearer ${token}`)
          .expect(401)

        const updatedChannel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })

        const updatedMessage = updatedChannel?.messages.find(
          (message) => message.content === "updated message",
        )
        expect(updatedMessage).toBeFalsy()
      })

      it("Returns 200 and updates message if user is in channel and message exists", async () => {
        const user1 = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user1?.id as string })
        const payload = { content: "updated message" }

        const channel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })

        const res = await api
          .patch(`${url}/${channel?.id}/${channel?.messages[0].id}`)
          .send(payload)
          .set("authorization", `Bearer ${token}`)
          .expect(200)

        const message = res.body
        expect(message.content).toBe("updated message")

        const updatedChannel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })

        const updatedMessage = updatedChannel?.messages.find(
          (message) => message.content === "updated message",
        )
        expect(updatedMessage).toBeTruthy()
      })
    })
  })

  describe.only(`DELETE ${url}/:channelId/:messageId`, () => {
    it("Returns 400 if invalid channelId or serverId is given", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .delete(`${url}/asdf/asdf`)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Doesnt allow an unauthenticated user to delete a message", async () => {
      const channel = await Channel.findOne({
        where: {
          name: "testusername1's Channel",
        },
        relations: { messages: true },
      })
      const message = channel?.messages[0]

      await api.delete(`${url}/${channel?.id}/${message?.id}`).expect(401)
    })

    it("Doesnt allow a user who isnt in the channel to delete a message", async () => {
      const user = await User.findOneBy({ username: "testusername2" })
      const token = jwtUtils.signToken({ userId: user?.id as string })

      const channel = await Channel.findOne({
        where: {
          name: "testusername1's Channel",
        },
        relations: { messages: true },
      })
      const message = channel?.messages[0]

      await api
        .delete(`${url}/${channel?.id}/${message?.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 404 if no channel is found", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .delete(
          `${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8/d063e5e8-446a-480f-bc8b-83c0ad33f1a8`,
        )
        .set("authorization", `Bearer ${token}`)
        .expect(404)
    })

    describe("If channel is a server channel", () => {
      it("Returns 401 if user is not in server where the message is in", async () => {
        const user3 = await User.findOneBy({ username: "testusername3" })
        const token = jwtUtils.signToken({ userId: user3?.id as string })

        const channel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })

        const initialMessageCount = channel?.messages.length
        expect(initialMessageCount).toBe(5)

        await api
          .delete(`${url}/${channel?.id}/${channel?.messages[0].id}`)
          .set("authorization", `Bearer ${token}`)
          .expect(401)

        const updatedChannel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })
        expect(updatedChannel?.messages.length).toBe(initialMessageCount)
      })

      it("Returns 204 and deletes message if user is in channel and message exists", async () => {
        const user1 = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user1?.id as string })

        const channel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })

        const initialMessageCount = channel?.messages.length as number
        expect(initialMessageCount).toBe(5)

        await api
          .delete(`${url}/${channel?.id}/${channel?.messages[0].id}`)
          .set("authorization", `Bearer ${token}`)
          .expect(204)

        const updatedChannel = await Channel.findOne({
          where: {
            name: "testusername1's Channel",
          },
          relations: { messages: true },
        })
        expect(updatedChannel?.messages.length).toBe(initialMessageCount - 1)
      })
    })

    describe("If channel is a direct message channel", () => {
      it("Returns 401 if user does not have a direct message relation with the channel he is trying to delete from", async () => {
        const user2 = await User.findOneBy({ username: "testusername2" })
        const token = jwtUtils.signToken({ userId: user2?.id as string })

        const channel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })

        const initialMessageCount = channel?.messages.length
        expect(initialMessageCount).toBe(3)

        await api
          .delete(`${url}/${channel?.id}/${channel?.messages[0].id}`)
          .set("authorization", `Bearer ${token}`)
          .expect(401)

        const updatedChannel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })
        expect(updatedChannel?.messages.length).toBe(initialMessageCount)
      })

      it("Returns 204 and deletes message if user is in channel and message exists", async () => {
        const user1 = await User.findOneBy({ username: "testusername1" })
        const token = jwtUtils.signToken({ userId: user1?.id as string })

        const channel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })

        const initialMessageCount = channel?.messages.length as number
        expect(initialMessageCount).toBe(3)

        await api
          .delete(`${url}/${channel?.id}/${channel?.messages[0].id}`)
          .set("authorization", `Bearer ${token}`)
          .expect(204)

        const updatedChannel = await Channel.findOne({
          where: {
            name: "user1 user3",
          },
          relations: { messages: true },
        })
        expect(updatedChannel?.messages.length).toBe(initialMessageCount - 1)
      })
    })
  })
})
