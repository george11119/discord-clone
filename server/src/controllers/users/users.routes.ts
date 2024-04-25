import { User } from "../../models/user"
import bcrypt from "bcrypt"
import express from "express"
import { validate } from "class-validator"
import jwtUtils from "../../utils/jwtUtils"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { FriendRequest } from "../../models/friendRequest"

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
router.get("/friendrequests/sent", authenticatedValidator, async (req, res) => {
  const sentFriendRequests = await FriendRequest.find({
    where: { senderId: req.user?.id },
  })

  res.json(sentFriendRequests)
})

router.get(
  "/friendrequests/received",
  authenticatedValidator,
  async (req, res) => {
    const sentFriendRequests = await FriendRequest.find({
      where: { receiverId: req.user?.id },
    })

    res.json(sentFriendRequests)
  },
)

router.post("/friendrequests", authenticatedValidator, async (req, res) => {
  const { username } = req.body
  const friendRequestSender = req.user as User
  const friendRequestReceiver = await User.findOne({ where: { username } })

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

  if (friendRequest) {
    return res
      .status(400)
      .json({ message: "You have already sent a friend request to this user" })
  }

  await FriendRequest.save({
    senderId: friendRequestSender.id,
    receiverId: friendRequestReceiver.id,
  })

  res.status(204).end()
})

export default router
