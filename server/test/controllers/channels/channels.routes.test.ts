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

      const { channels } = res.body
      expect(channels.length).toBe(2)
    })
  })
})
