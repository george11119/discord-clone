import supertest from "supertest"
import { server } from "../../../src/app"
import testHelpers, { dbSetupAndTeardown } from "../../helpers"
import { beforeEach, describe, expect, it } from "@jest/globals"
import { User } from "../../../src/models/user"
import { Server } from "../../../src/models/server"
import { Channel } from "../../../src/models/channel"
import { Message } from "../../../src/models/message"
import jwtUtils from "../../../src/utils/jwtUtils"

const api = supertest(server)
const url = "/api/messages"

dbSetupAndTeardown()

describe(`${url}`, () => {
  beforeEach(async () => {
    await Server.delete({})
    await User.delete({})
    await Channel.delete({})
    await Message.delete({})

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

    const user2 = await testHelpers.generateUser({
      username: "testusername2",
      password: "password",
      email: "test2@test.com",
    })

    const user2Server = await testHelpers.generateServer({
      name: "User 2's Server",
      user: user2,
    })

    const channel2 = await testHelpers.generateChannel({
      name: "testusername2's Channel",
      server: user2Server,
    })
  })

  describe(`GET ${url}/:channelId`, () => {
    it("Does not return a list of messages for a given channel if user is not authenticated", async () => {
      const channel = await Channel.findOneBy({
        name: "testusername1's Channel",
      })
      await api.get(`${url}/${channel?.id}`).expect(401)
    })

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

      const { messages } = res.body
      expect(messages.length).toBe(5)

      const [message] = messages
      expect(message.content).toBeTruthy()

      const messageOwner = message.user
      expect(messageOwner.username).toBe(user?.username)
    })
  })
})
