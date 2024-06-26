import { User } from "../../models/user"
import bcrypt from "bcrypt"
import express from "express"
import { validate } from "class-validator"
import jwtUtils from "../../utils/jwtUtils"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { FriendRequest } from "../../models/friendRequest"
import { Friendship } from "../../models/friendship"
import { io } from "../../app"

const router = express.Router()

// create new user
router.post("/", async (req, res) => {
  const { username, email, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = User.create({ username, email, passwordHash })

  const validationErrors = await validate(user)

  if (validationErrors.length > 0 || password.length < 8) {
    res.status(400).send({
      error: "Validation failed",
    })
  } else {
    await User.save(user)

    // gotta refetch this because the old user contained a passwordHash field
    // i dont want that returned in res.json
    const savedUser = await User.findOneBy({ id: user.id })
    const token = jwtUtils.signToken({ userId: savedUser?.id as string })

    res.status(201).json({ token, user: savedUser })
  }
})

// get info about a single user
router.get("/:userId", authenticatedValidator, async (req, res) => {
  const { userId } = req.params
  const user = await User.findOne({ where: { id: userId } })

  if (!user) return res.status(404).json({ message: "User not found" })

  res.json(user)
})

// friend request routes
router.get("/@me/friendrequests", authenticatedValidator, async (req, res) => {
  const sentFriendRequests = await FriendRequest.find({
    where: { senderId: req.user?.id },
    relations: { receiver: true },
  })
  const receivedFriendRequests = await FriendRequest.find({
    where: { receiverId: req.user?.id },
    relations: { sender: true },
  })

  res.json({
    sent: sentFriendRequests,
    received: receivedFriendRequests,
  })
})

router.post("/@me/friendrequests", authenticatedValidator, async (req, res) => {
  const { username } = req.body
  const friendRequestSender = req.user as User
  const friendRequestReceiver = await User.findOne({ where: { username } })

  // dont allow user to send friend request to himself
  if (friendRequestSender.id === friendRequestReceiver?.id) {
    return res
      .status(400)
      .json({ message: "You cannot send a friend request to yourself" })
  }

  // dont allow user to send friend request to non existent user
  if (!friendRequestReceiver) {
    return res
      .status(400)
      .json({ message: "No users with this username exist" })
  }

  const friendRequest = await FriendRequest.findOne({
    where: {
      senderId: friendRequestSender.id,
      receiverId: friendRequestReceiver.id,
    },
  })

  // dont allow user to send duplicate friend requests
  if (friendRequest) {
    return res
      .status(400)
      .json({ message: "You have already sent a friend request to this user" })
  }

  const friendship = await Friendship.findOne({
    where: {
      ownerId: friendRequestSender.id,
      friendId: friendRequestReceiver.id,
    },
  })

  // dont allow user to send friend requests to people they are already friends with
  if (friendship) {
    return res.status(400).json({
      message:
        "You cannot send a friend request to a user you are friends with",
    })
  }

  const friendRequestFromReceiver = await FriendRequest.findOne({
    where: {
      senderId: friendRequestReceiver.id,
      receiverId: friendRequestSender.id,
    },
  })

  // if the user they are sending a friend request to has already sent one to the user,
  // delete the friend request and create a friendship relationship for them
  if (friendRequestFromReceiver) {
    await FriendRequest.delete({
      senderId: friendRequestReceiver?.id,
      receiverId: friendRequestSender?.id,
    })

    const friendship = Friendship.create({
      ownerId: friendRequestSender?.id,
      friendId: friendRequestReceiver?.id,
    })
    await friendship.save()

    io.to(`${friendRequestReceiver?.id}`).emit(
      "friendRequest:accepted",
      friendRequestSender,
    )

    return res.status(201).json({
      ...friendship,
      owner: friendRequestSender,
      friend: friendRequestReceiver,
    })
  }

  const createdFriendRequest = await FriendRequest.save({
    senderId: friendRequestSender.id,
    receiverId: friendRequestReceiver.id,
  })

  io.to(`${createdFriendRequest.receiverId}`).emit("friendRequest:received", {
    ...createdFriendRequest,
    sender: friendRequestSender,
  })

  res
    .status(201)
    .json({ ...createdFriendRequest, receiver: friendRequestReceiver })
})

router.put("/@me/friendrequests", authenticatedValidator, async (req, res) => {
  const { username } = req.body
  const receiver = req.user
  const sender = await User.findOne({ where: { username } })

  const friendRequest = await FriendRequest.findOne({
    where: { senderId: sender?.id, receiverId: receiver?.id },
  })

  if (!friendRequest) {
    return res.status(400).json({
      message:
        "The user you are trying to friend must first send you a friend request",
    })
  }

  await FriendRequest.delete({ senderId: sender?.id, receiverId: receiver?.id })

  const owner = receiver
  const friend = sender

  const friendship = Friendship.create({
    ownerId: owner?.id,
    friendId: friend?.id,
  })
  await friendship.save()

  io.to(`${friend?.id}`).emit("friendRequest:accepted", owner)

  res.status(204).end()
})

router.delete(
  "/@me/friendrequests",
  authenticatedValidator,
  async (req, res) => {
    const { username } = req.body
    const user2 = await User.findOne({ where: { username } })

    if (!user2) return res.status(204).end()

    await FriendRequest.createQueryBuilder("friend_request")
      .delete()
      .where("senderId = :user1Id AND receiverId = :user2Id", {
        user1Id: req.user?.id,
        user2Id: user2?.id,
      })
      .orWhere("receiverId = :user1Id AND senderId = :user2Id", {
        user1Id: req.user?.id,
        user2Id: user2?.id,
      })
      .execute()

    io.to(`${user2?.id}`).emit("friendRequest:destroy", req.user?.id)

    res.status(204).end()
  },
)

// friendships stuff
router.get("/@me/friends", authenticatedValidator, async (req, res) => {
  const friends = await User.createQueryBuilder("friend")
    .innerJoin(Friendship, "friendship", "friendship.friendId = friend.id")
    .innerJoin("user", "owner", "friendship.ownerId = owner.id")
    .where("friendship.ownerId = :ownerId", { ownerId: req.user?.id })
    .orderBy("friend.username")
    .getMany()

  res.json(friends)
})

router.delete(
  "/@me/friends/:friendId",
  authenticatedValidator,
  async (req, res) => {
    const { friendId } = req.params

    await Friendship.createQueryBuilder("friendship")
      .delete()
      .where("ownerId = :user1Id AND friendId = :user2Id", {
        user1Id: req.user?.id,
        user2Id: friendId,
      })
      .orWhere("friendId = :user1Id AND ownerId = :user2Id", {
        user1Id: req.user?.id,
        user2Id: friendId,
      })
      .execute()

    io.to(`${friendId}`).emit("friendship:destroy", req.user?.id)

    res.status(204).end()
  },
)

export default router
