import { describe, it, expect, beforeEach } from "@jest/globals"
import supertest from "supertest"
import { server } from "../../../src/app"
import { User } from "../../../src/models/user"
import testHelpers, { dbSetupAndTeardown } from "../../helpers"
import jwtUtils from "../../../src/utils/jwtUtils"
import { FriendRequest } from "../../../src/models/friendRequest"
import { Friendship } from "../../../src/models/friendship"
import { db } from "../../../src/config/db"

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

  describe(`GET ${url}/@me/friendrequests`, () => {
    it("Returns 401 if user is not logged in", async () => {
      await api.get(`${url}/friendrequests`).expect(401)
    })

    it("Returns all the users sent friend requests if user is logged in", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      // user1 is sending to user2
      const user2 = await User.findOneBy({ username: "testusername2" })
      await FriendRequest.save({
        senderId: user1?.id,
        receiverId: user2?.id,
      })

      // user1 is sending to existing user
      const existingUser = await User.findOneBy({ username: "existinguser" })
      await FriendRequest.save({
        senderId: user1?.id,
        receiverId: existingUser?.id,
      })

      // user1 is receiving from user3
      const user3 = await User.findOneBy({ username: "testusername3" })
      await FriendRequest.save({
        senderId: user3?.id,
        receiverId: user1?.id,
      })

      const res = await api
        .get(`${url}/@me/friendrequests`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const {
        sent,
        received,
      }: { sent: FriendRequest[]; received: FriendRequest[] } = res.body

      expect(sent.length).toBe(2)
      expect(sent.every((fr) => fr.senderId === user1?.id))
      expect(sent.some((fr) => fr.receiver.id === user2?.id))

      expect(received.length).toBe(1)
      expect(received.every((fr) => fr.receiverId === user1?.id))
      expect(received.some((fr) => fr.sender.id === user3?.id))
    })
  })

  describe(`POST ${url}/@me/friendrequests`, () => {
    it("Returns 401 if user is not logged in", async () => {
      const user = await User.findOne({ where: { username: "testusername2 " } })
      const payload = {
        username: user?.username,
      }

      await api.post(`${url}/@me/friendrequests`).send(payload).expect(401)
    })

    it("Returns 400 if user tries to send a friend request to a non existent user", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })
      const payload = {
        username: "idontexist38573",
      }

      const res = await api
        .post(`${url}/@me/friendrequests`)
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
        .post(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)

      const { message } = res.body
      expect(message).toMatch(
        /You have already sent a friend request to this user/,
      )
    })

    it("Returns 400 if user tries to send a friend request to themselves", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const payload = {
        username: user1?.username,
      }

      const res = await api
        .post(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)

      const { message } = res.body
      expect(message).toMatch(/You cannot send a friend request to yourself/)
    })

    it("Returns 400 if user is already friends with user they are trying to send to", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })
      const payload = {
        username: user2?.username,
      }

      const friendship = Friendship.create({
        ownerId: user1?.id,
        friendId: user2?.id,
      })
      await friendship.save()

      const res = await api
        .post(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)

      const { message } = res.body
      expect(message).toMatch(
        /You cannot send a friend request to a user you are friends with/,
      )
    })

    it("Creates a friendship relationship between the 2 users if the receiver of the friend request has already sent one to the sender", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })
      await FriendRequest.save({
        senderId: user2?.id,
        receiverId: user1?.id,
      })

      const payload = {
        username: user2?.username,
      }

      await api
        .post(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(201)

      const friendRequest = await FriendRequest.findOne({
        where: [
          { senderId: user1?.id, receiverId: user2?.id },
          { senderId: user2?.id, receiverId: user1?.id },
        ],
      })
      expect(friendRequest).toBe(null)

      // there should be 2 friendship models created, both inverse of each other
      const friendship1 = await Friendship.find({
        where: {
          ownerId: user1?.id,
          friendId: user2?.id,
        },
      })
      expect(friendship1).toBeTruthy()
      const friendship2 = await Friendship.find({
        where: {
          ownerId: user2?.id,
          friendId: user1?.id,
        },
      })
      expect(friendship2).toBeTruthy()
    })

    it("Returns 201 if user sends a friend request to an existing user", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })
      const payload = {
        username: user2?.username,
      }

      const res = await api
        .post(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(201)

      const { senderId, receiver } = res.body
      expect(senderId).toBe(user1?.id)
      expect(user2?.username).toBe(receiver.username)
    })
  })

  describe(`PUT ${url}/@me/friendrequests`, () => {
    it("Returns 401 if user is not logged in", async () => {
      const user = await User.findOne({ where: { username: "testusername2 " } })
      const payload = {
        username: user?.username,
      }

      await api.put(`${url}/@me/friendrequests`).send(payload).expect(401)
    })

    it("Returns 400 if no friend request exists between the users", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })
      const payload = {
        username: user2?.username,
      }

      const res = await api
        .put(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)

      const { message } = res.body
      expect(message).toMatch(
        /The user you are trying to friend must first send you a friend request/,
      )
    })

    it("Returns 400 if user sends a friend request to another user then tries to friend them", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })

      // user1 sent this friend request to user2, user1 going to attempt to call
      // this endpoint and accept the friend request on behalf of user 2.
      // this should fail.
      await FriendRequest.save({
        senderId: user1?.id,
        receiverId: user2?.id,
      })

      const payload = {
        username: user2?.username,
      }

      const res = await api
        .put(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(400)

      const { message } = res.body
      expect(message).toMatch(
        /The user you are trying to friend must first send you a friend request/,
      )

      const friendRequest = await FriendRequest.findOne({
        where: {
          senderId: user1?.id,
          receiverId: user2?.id,
        },
      })
      expect(friendRequest).toBeTruthy()
    })

    it("Returns 204 and creates friendship relationship between 2 users if conditions are met", async () => {
      // condition: the user who is creating a friendship must have received a
      // friendship request from another user first
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })

      // user2 sent this friend request to user1, user1 will now accept it
      await FriendRequest.save({
        senderId: user2?.id,
        receiverId: user1?.id,
      })

      const payload = {
        username: user2?.username,
      }

      await api
        .put(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(204)

      // the friend request should have been deleted since they are now friends
      const deletedFriendRequest = await FriendRequest.findOne({
        where: {
          senderId: user2?.id,
          receiverId: user1?.id,
        },
      })
      expect(deletedFriendRequest).toBe(null)

      // there should be 2 friendship models created, both inverse of each other
      const friendship1 = await Friendship.find({
        where: {
          ownerId: user1?.id,
          friendId: user2?.id,
        },
      })
      expect(friendship1).toBeTruthy()
      const friendship2 = await Friendship.find({
        where: {
          ownerId: user2?.id,
          friendId: user1?.id,
        },
      })
      expect(friendship2).toBeTruthy()
    })
  })

  describe(`DELETE ${url}/@me/friendrequests`, () => {
    it("Returns 401 if user is not logged in", async () => {
      const user = await User.findOne({ where: { username: "testusername2 " } })
      const payload = {
        username: user?.username,
      }

      await api.delete(`${url}/@me/friendrequests`).send(payload).expect(401)
    })

    it("Cancels sent friend requests", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })

      // user1 sent this friend request to user2, user1 is going to cancel it
      const friendRequest = await FriendRequest.save({
        senderId: user1?.id,
        receiverId: user2?.id,
      })

      const payload = {
        username: user2?.username,
      }

      await api
        .delete(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(204)

      const deletedFriendRequest = await FriendRequest.findOne({
        where: { id: friendRequest.id },
      })
      expect(deletedFriendRequest).toBe(null)
    })

    it("Rejects received friend requests", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })

      // user2 sent this friend request to user1, user1 is going to reject it
      const friendRequest = await FriendRequest.save({
        senderId: user2?.id,
        receiverId: user1?.id,
      })

      const payload = {
        username: user2?.username,
      }

      await api
        .delete(`${url}/@me/friendrequests`)
        .send(payload)
        .set("authorization", `Bearer ${token}`)
        .expect(204)

      const deletedFriendRequest = await FriendRequest.findOne({
        where: { id: friendRequest.id },
      })
      expect(deletedFriendRequest).toBe(null)
    })
  })

  describe(`GET ${url}/@me/friends`, () => {
    it("Returns 401 if user not logged in ", async () => {
      await api.get(`${url}/@me/friends`).expect(401)
    })

    it("Returns a list containing all of the current user's friends", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })
      const user2Friendship = Friendship.create({
        ownerId: user1?.id,
        friendId: user2?.id,
      })
      await user2Friendship.save()

      const user3 = await User.findOneBy({ username: "testusername3" })
      const user3Friendship = Friendship.create({
        ownerId: user1?.id,
        friendId: user3?.id,
      })
      await user3Friendship.save()

      const res = await api
        .get(`${url}/@me/friends`)
        .set("authorization", `Bearer ${token}`)
        .expect(200)

      const friends: User[] = res.body
      expect(friends.some((u) => u.id === user2?.id)).toBe(true)
      expect(friends.some((u) => u.id === user3?.id)).toBe(true)
    })
  })

  describe(`DELETE ${url}/@me/friends/:friendId`, () => {
    it("Returns 401 if user not logged in", async () => {
      const user2 = await User.findOneBy({ username: "testusername2" })
      await api.delete(`${url}/@me/friends/${user2?.id}`).expect(401)
    })

    it("Removes a friendship relationship between 2 users", async () => {
      const user1 = await User.findOneBy({ username: "testusername1" })
      const token = jwtUtils.signToken({ userId: user1?.id as string })

      const user2 = await User.findOneBy({ username: "testusername2" })
      const user2Friendship = Friendship.create({
        ownerId: user1?.id,
        friendId: user2?.id,
      })
      await user2Friendship.save()

      const friendshipsCount = await Friendship.count()
      expect(friendshipsCount).toBe(2)

      await api
        .delete(`${url}/@me/friends/${user2?.id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(204)

      const friendshipsCountAfterDelete = await Friendship.count()
      expect(friendshipsCountAfterDelete).toBe(0)
    })
  })
})
