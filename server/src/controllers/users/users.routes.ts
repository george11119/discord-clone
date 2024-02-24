import { User } from "../../models/user"
import bcrypt from "bcrypt"
import express from "express"
import { db } from "../../config/db"
import { validate } from "class-validator"

const router = express.Router()

// create new user
router.post("/", async (req, res) => {
  const { username, email, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = db.getRepository(User).create({ username, email, passwordHash })

  const validationErrors = await validate(user)

  if (validationErrors.length > 0 || password.length < 8) {
    res.status(400).send({
      error: "Validation failed",
    })
  } else {
    await db.getRepository(User).save(user)
    res
      .status(201)
      .json(await db.getRepository(User).findOneBy({ id: user.id }))
  }
})

export default router
