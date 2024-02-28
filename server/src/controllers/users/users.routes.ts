import { User } from "../../models/user"
import bcrypt from "bcrypt"
import express from "express"
import { validate } from "class-validator"
import jwt from "jsonwebtoken"
import config from "../../config/config"

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

    const token = jwt.sign(user.id, config.JWT_SECRET as string)
    const savedUser = await User.findOneBy({ id: user.id })

    res.status(201).json({ token, user: savedUser })
  }
})

export default router
