import { User } from "../../models/user"
import bcrypt from "bcrypt"
import express from "express"
import { db } from "../../config/db"
import usersHelpers from "./users.helpers"

const router = express.Router()

// create new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await db
      .getRepository(User)
      .save({ username, email, passwordHash })

    res.status(201).json(usersHelpers.removePasswordHash(user))
  } catch (e) {
    console.log(e)
  }
})

export default router
