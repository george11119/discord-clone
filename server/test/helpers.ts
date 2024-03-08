import { afterAll, beforeAll } from "@jest/globals"
import { clearDatabase, db } from "../src/config/db"
import bcrypt from "bcrypt"
import { User } from "../src/models/user"

export const dbSetupAndTeardown = () => {
  beforeAll(async () => {
    // start up database connection
    await db.initialize()
  })

  afterAll(async () => {
    // clear out database and close database connection
    await clearDatabase()
    await db.destroy()
  })
}

export const generateUser = async ({
  email,
  username,
  password,
}: {
  email: string
  username: string
  password: string
}): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = await User.save({
    email,
    passwordHash,
    username,
  })

  return newUser
}
