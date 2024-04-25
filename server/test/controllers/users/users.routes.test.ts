import { describe, it, expect, beforeEach } from "@jest/globals"
import supertest from "supertest"
import { server } from "../../../src/app"
import { User } from "../../../src/models/user"
import testHelpers, { dbSetupAndTeardown } from "../../helpers"
import jwtUtils from "../../../src/utils/jwtUtils"
import { FriendRequest } from "../../../src/models/friendRequest"

const api = supertest(server)
const url = "/api/users"

dbSetupAndTeardown()

describe(`${url}`, () => {
  beforeEach(async () => {
    await User.delete({})

    await testHelpers.generateUser({
      username: "testusername1",
      password: "password",
      email: "test1@test.com",
    })

    await testHelpers.generateUser({
      username: "testusername2",
      password: "password",
      email: "test2@test.com",
    })

    await testHelpers.generateUser({
      username: "testusername3",
      password: "password",
      email: "test3@test.com",
    })

    await testHelpers.generateUser({
      username: "existinguser",
      password: "password",
      email: "existinguser@test.com",
    })
  }, 10000)

  describe(`POST ${url}`, () => {
    it("Creates new account when email and username are unique and password is valid", async () => {
      const initialUserCount = await User.count()
      const newUser = {
        email: "newuser@test.com",
        username: "newuser",
        password: "password",
      }

      const res = await api
        .post(`${url}`)
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const { user, token } = res.body

      expect(user.username).toBe("newuser")
      expect(user.email).toBe("newuser@test.com")
      expect(user.passwordHash).toBe(undefined)

      expect(token).toBeTruthy()

      const usersCount = await User.count()
      expect(usersCount).toBe(initialUserCount + 1)
    })

    it("Doesnt create new account with duplicate email", async () => {
      const initialUserCount = await User.count()
      const newUser = {
        email: "existinguser@test.com", // a user with this email already exists
        username: "newuser",
        password: "password",
      }

      await api.post(`${url}`).send(newUser).expect(400)

      const usersCount = await User.count()
      expect(usersCount).toBe(initialUserCount)
    })

    it("Doesnt create new account with duplicate username", async () => {
      const initialUserCount = await User.count()
      const newUser = {
        email: "existinguser@test.com",
        username: "existinguser", // a user with this username already exists
        password: "password",
      }

      await api.post(`${url}`).send(newUser).expect(400)

      const usersCount = await User.count()
      expect(usersCount).toBe(initialUserCount)
    })

    it("Doesnt create new account with invalid password", async () => {
      const initialUserCount = await User.count()
      const newUser = {
        email: "newuser@test.com",
        username: "newuser",
        password: "a", // password is too short
      }

      await api.post(`${url}`).send(newUser).expect(400)

      const usersCount = await User.count()
      expect(usersCount).toBe(initialUserCount)
    })
  })

  describe(`GET ${url}/:userId`, () => {
    it("Doesnt return a user if unauthenticated", async () => {
      const user = await User.findOne({ where: { username: "existinguser" } })
      await api.get(`${url}/${user?.id}`).expect(401)
    })

    it("Returns 400 if id is not uuid", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .get(`${url}/asdf`)
        .set("authorization", `Bearer ${token}`)
        .expect(400)
    })

    it("Returns 404 if user is not found", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      await api
        .get(`${url}/6bb916fd-07b8-4509-8f82-72cc33fce612`)
        .set("authorization", `Bearer ${token}`)
        .expect(404)
    })

    it("Returns 200 and user info if user is found", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOne({ where: { username: "existinguser" } })

      const res = await api
        .get(`${url}/${user2?.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const user: User = res.body
      expect(user.id).toBe(user2?.id)
      expect(user.username).toBe(user2?.username)
      expect(user.email).toBe(user2?.email)
    })
  })

  describe(`GET ${url}/friendrequests/sent`, () => {
    it("Returns 401 if user is not logged in", async () => {
      await api.get(`${url}/friendrequests/sent`).expect(401)
    })

    it("Returns all the users sent friend requests if user is logged in", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      // user1 is sending
      const user2 = await User.findOneBy({ username: "testusername2" })
      await FriendRequest.save({
        senderId: user1?.id,
        receiverId: user2?.id,
      })

      // user1 is sending
      const existingUser = await User.findOneBy({ username: "existinguser" })
      await FriendRequest.save({
        senderId: user1?.id,
        receiverId: existingUser?.id,
      })

      // user1 is receiving
      const user3 = await User.findOneBy({ username: "testusername3" })
      await FriendRequest.save({
        senderId: user3?.id,
        receiverId: user1?.id,
      })

      const res = await api
        .get(`${url}/friendrequests/sent`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const sentFriendRequests: FriendRequest[] = res.body
      expect(sentFriendRequests.length).toBe(2)
      expect(sentFriendRequests.every((fr) => fr.senderId === user1?.id))
    })
  })

  describe(`GET ${url}/friendrequests/received`, () => {
    it("Returns 401 if user is not logged in", async () => {
      await api.get(`${url}/friendrequests/received`).expect(401)
    })

    it("Returns all the users received friend requests if user is logged in", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      // user1 is sending
      const user2 = await User.findOneBy({ username: "testusername2" })
      await FriendRequest.save({
        senderId: user1?.id,
        receiverId: user2?.id,
      })

      // user1 is receiving
      const existingUser = await User.findOneBy({ username: "existinguser" })
      await FriendRequest.save({
        senderId: existingUser?.id,
        receiverId: user1?.id,
      })

      // user1 is receiving
      const user3 = await User.findOneBy({ username: "testusername3" })
      await FriendRequest.save({
        senderId: user3?.id,
        receiverId: user1?.id,
      })

      const res = await api
        .get(`${url}/friendrequests/received`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const receivedFriendRequests: FriendRequest[] = res.body
      expect(receivedFriendRequests.length).toBe(2)
      expect(receivedFriendRequests.every((fr) => fr.receiverId === user1?.id))
    })
  })

  describe(`POST ${url}/friendrequests`, () => {
    it("Returns 401 if user is not logged in", async () => {
      const user = await User.findOne({ where: { username: "testusername2 " } })
      const payload = {
        username: user?.username,
      }

      await api.post(`${url}/friendrequests`).send(payload).expect(401)
    })

    it("Returns 400 if user tries to send a friend request to a non existent user", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = {
        username: "idontexist38573",
      }

      const res = await api
        .post(`${url}/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)

      const { message } = res.body
      expect(message).toMatch(/No users with this username exist/)
    })

    it("Returns 400 if user tries to send a friend request when a friend request already exists", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })
      await FriendRequest.save({
        senderId: user1?.id,
        receiverId: user2?.id,
      })

      const payload = {
        username: user2?.username,
      }

      const res = await api
        .post(`${url}/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)

      const { message } = res.body
      expect(message).toMatch(
        /You have already sent a friend request to this user/,
      )
    })

    it("Returns 204 if user sends a friend request to an existing user", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })
      const payload = {
        username: user2?.username,
      }

      await api
        .post(`${url}/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(204)
    })
  })
})
