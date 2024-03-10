import { beforeEach, describe, expect, it } from "@jest/globals"
import supertest from "supertest"
import { server } from "../../../src/app"
import testHelpers, { dbSetupAndTeardown } from "../../helpers"
import { User } from "../../../src/models/user"
import { Server } from "../../../src/models/server"
import jwtUtils from "../../../src/utils/jwtUtils"
import { UserServers } from "../../../src/models/userServers"

const api = supertest(server)
const url = "/api/servers"

dbSetupAndTeardown()

describe(`${url}`, () => {
  beforeEach(async () => {
    await User.delete({})
    await Server.delete({})

    const user1 = await testHelpers.generateUser({
      username: "user1",
      password: "password",
      email: "user1@test.com",
    })

    // user1 is in 2 servers
    for (let i = 1; i <= 2; i++) {
      await testHelpers.generateServer({
        name: `user1's server ${i}`,
        user: user1,
      })
    }

    const user2 = await testHelpers.generateUser({
      username: "user2",
      password: "password",
      email: "user2@test.com",
    })

    // user2 is in 4 servers
    for (let i = 1; i <= 4; i++) {
      await testHelpers.generateServer({
        name: `user2's server ${i}`,
        user: user2,
      })
    }
  })

  describe(`GET ${url}`, () => {
    it("Does not return list of servers if user is not authenticated", async () => {
      await api.get(`${url}`).expect(401)
    })

    it("Returns a list of servers the user is in if user is authenticated", async () => {
      const user = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user?.id as string })

      const res = await api
        .get(`${url}`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const { servers } = res.body
      expect(servers.length).toBe(2)

      const [server] = servers
      expect(server.name).toBeTruthy()
    })

    it("Only returns the servers that the user is currently in", async () => {
      // get and validate servers of user 1
      const user1 = await User.findOneBy({ username: "user1" })
      const user1Token = jwtUtils.signToken({ userId: user1?.id as string })

      const user1Response = await api
        .get(`${url}`)
        .set("authorization", `Bearer ${user1Token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const user1Servers = user1Response.body.servers
      expect(user1Servers.length).toBe(2)

      // get and validate servers of user 2
      const user2 = await User.findOneBy({ username: "user2" })
      const user2Token = jwtUtils.signToken({ userId: user2?.id as string })

      const user2Response = await api
        .get(`${url}`)
        .set("authorization", `Bearer ${user2Token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const user2Servers = user2Response.body.servers
      expect(user2Servers.length).toBe(4)
    })
  })

  describe.only(`POST ${url}`, () => {
    it("Doesnt allow a unauthenticated user to create a new server", async () => {
      const payload = { name: "New server" }

      await api.post(`${url}`).send(payload).expect(401)
    })

    it("Creates a server when there is a logged in user", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "New server" }
      const initialServerCount = await Server.count()

      const res = await api
        .post(`${url}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      // check that response has no problems
      const server = res.body
      expect(server.name).toBe("New server")

      // check that a new server exists
      const finalServerCount = await Server.count()
      expect(finalServerCount).toBe(initialServerCount + 1)

      // check that a userServer entry has been created
      const userServer = await UserServers.findOne({
        where: {
          userId: user1?.id,
          serverId: server.id,
        },
      })
      expect(userServer).toBeTruthy()
    })
  })
})
