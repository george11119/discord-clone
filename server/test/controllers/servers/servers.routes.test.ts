import { beforeEach, describe, expect, it } from "@jest/globals"
import supertest from "supertest"
import { server } from "../../../src/app"
import testHelpers, { dbSetupAndTeardown } from "../../helpers"
import { User } from "../../../src/models/user"
import { Server } from "../../../src/models/server"
import jwtUtils from "../../../src/utils/jwtUtils"
import { UserServers } from "../../../src/models/userServers"
import { redisClient } from "../../../src/config/redis"

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

    // add 5 more users into user2's server 1
    const server = await Server.findOne({ where: { name: "user2's server 1" } })
    for (let i = 1; i <= 5; i++) {
      const user = await testHelpers.generateUser({
        username: `filleruser${i}`,
        password: "password",
        email: `filleruser${i}@test.com`,
      })
      await UserServers.save({ userId: user?.id, serverId: server?.id })
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

  describe(`POST ${url}`, () => {
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

      const createdServer = await Server.findOne({
        where: { id: server.id },
        relations: { channels: true },
      })

      expect(
        createdServer?.channels.find((c) => c.name === "general"),
      ).toBeTruthy()
    })
  })

  describe(`PATCH ${url}/:serverId`, () => {
    it("Returns 400 if invalid serverId is given", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "Updated server name" }

      await api
        .patch(`${url}/asdf`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Returns 401 if user is not logged in", async () => {
      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })
      const payload = { name: "Updated server name" }

      await api
        .patch(`${url}/${server?.id}`)
        .send(payload)
        .expect(401)
    })

    it("Returns 401 if user is not in the server they are trying to update", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "Updated server name" }

      const server = await Server.findOne({
        where: { name: "user2's server 1" },
      })

      await api
        .patch(`${url}/${server?.id}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 404 if no server is found", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "Updated server name" }

      await api
        .patch(`${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(404)
    })

    it("Updates server if server is found and user is in the server", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = { name: "Updated server name" }

      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })

      const res = await api
        .patch(`${url}/${server?.id}`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const updatedServer = res.body
      expect(updatedServer.name).toBe("Updated server name")
    })
  })

  describe(`DELETE ${url}/:serverId`, () => {
    it("Returns 400 if invalid serverId is given", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .delete(`${url}/asdf`)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Returns 401 if user is not logged in", async () => {
      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })

      await api.delete(`${url}/${server?.id}`).expect(401)
    })

    it("Returns 401 if user is not in the server they are trying to delete", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const server = await Server.findOne({
        where: { name: "user2's server 1" },
      })

      await api
        .delete(`${url}/${server?.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 404 if no server is found", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .delete(`${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8`)
        .set("authorization", `Bearer ${token}`)
        .expect(404)
    })

    it("Deletes server if server is found and user is in the server", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })

      await api
        .delete(`${url}/${server?.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(204)

      const deletedServer = await Server.findOne({
        where: { name: "user1's server 1" },
      })

      expect(deletedServer).toBe(null)
    })
  })

  describe(`${url}/:serverId/invites`, () => {
    it("Returns 400 if invalid serverId is given", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .post(`${url}/asdf/invites`)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Returns 401 if user is not logged in", async () => {
      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })

      await api.post(`${url}/${server?.id}/invites`).expect(401)
    })

    it("Returns 401 if user is not in the server they are trying to create a invite for", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const server = await Server.findOne({
        where: { name: "user2's server 1" },
      })

      await api
        .post(`${url}/${server?.id}/invites`)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 404 if no server is found", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .post(`${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8/invites`)
        .set("authorization", `Bearer ${token}`)
        .expect(404)
    })

    it("Generates a invite link if user is in the server", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })

      const res = await api
        .post(`${url}/${server?.id}/invites`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      // check that response has no problems
      const { code } = res.body
      expect(code.length).toBe(16)

      const serverId = await redisClient.get(code)
      expect(serverId).toBe(server?.id)
    })
  })

  describe(`${url}/join/:inviteLinkId`, () => {
    it("Returns 401 if user is not logged in", async () => {
      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })
      const { code } = await testHelpers.generateServerInviteLink({
        server: server!,
      })

      await api.post(`${url}/join/${code}`).expect(401)
    })

    it("Returns 400 if invite link is invalid", async () => {
      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })
      const invalidCode = "asdjfkjaie"

      const user2 = await User.findOneBy({ username: "user2" })
      const token = jwtUtils.signToken({ userId: user2?.id as string })

      const res = await api
        .post(`${url}/join/${invalidCode}`)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const { joined } = res.body
      expect(joined).toBe(false)
    })

    it("Returns 400 if user is already in the server they are trying to join", async () => {
      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })
      const { code } = await testHelpers.generateServerInviteLink({
        server: server!,
      })

      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const res = await api
        .post(`${url}/join/${code}`)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const { joined } = res.body
      expect(joined).toBe(false)
    })

    it("Returns 200 if invite link is valid and user isnt part of the server yet", async () => {
      const server = await Server.findOne({
        where: { name: "user1's server 1" },
      })
      const { code } = await testHelpers.generateServerInviteLink({
        server: server!,
      })

      const user2 = await User.findOneBy({ username: "user2" })
      const token = jwtUtils.signToken({ userId: user2?.id as string })

      const res = await api
        .post(`${url}/join/${code}`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const { joined } = res.body
      expect(joined).toBe(true)

      const userServer = await UserServers.findOne({
        where: { userId: user2?.id, serverId: server?.id },
      })

      expect(userServer?.serverId).toBe(server?.id)
      expect(userServer?.userId).toBe(user2?.id)
    })
  })

  describe(`${url}/:serverId/users`, () => {
    it("Returns 401 if user is not logged in", async () => {
      const server = await Server.findOne({
        where: { name: "user2's server 1" },
      })

      await api.get(`${url}/${server?.id}/users`).expect(401)
    })

    it("Returns 401 if user is not in the server they are trying to get users of", async () => {
      const user1 = await User.findOneBy({ username: "user1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const server = await Server.findOne({
        where: { name: "user2's server 1" },
      })

      await api
        .get(`${url}/${server?.id}/users`)
        .set("authorization", `Bearer ${token}`)
        .expect(401)
    })

    it("Returns 404 if no server is found", async () => {
      const user2 = await User.findOneBy({ username: "user2" })
      const token = jwtUtils.signToken({ userId: user2?.id as string })

      await api
        .get(`${url}/d063e5e8-446a-480f-bc8b-83c0ad33f1a8/users`)
        .set("authorization", `Bearer ${token}`)
        .expect(404)
    })

    // note: there should be 6 users set in 'user2's server 1' in the beforeEach above
    it("Gets all users in a server when user is in the server", async () => {
      const user2 = await User.findOneBy({ username: "user2" })
      const token = jwtUtils.signToken({ userId: user2?.id as string })

      const server = await Server.findOne({
        where: { name: "user2's server 1" },
      })

      const res = await api
        .get(`${url}/${server?.id}/users`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const users: User[] = res.body
      expect(users.length).toBe(6)

      const fillerUser5 = users.find((u) => u.username === "filleruser5")
      expect(fillerUser5).toBeTruthy()
    })
  })
})
