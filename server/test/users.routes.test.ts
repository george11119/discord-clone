import {
  describe,
  it,
  beforeEach,
  expect,
  beforeAll,
  afterAll,
} from "@jest/globals"
import supertest from "supertest"
import { server } from "../src/app"
import { User } from "../src/models/user"
import bcrypt from "bcrypt"
import { db } from "../src/config/db"

const api = supertest(server)

beforeAll(async () => {
  await db.initialize()
})

afterAll(async () => {
  if (db.isInitialized) await db.destroy()
})

describe("POST /api/users", () => {
  beforeEach(async () => {
    await User.delete({})

    await User.save({
      username: "existinguser",
      passwordHash: await bcrypt.hash("password", 10), // password is "password"
      email: "existinguser@test.com",
    })
  }, 10000)

  it("Successfully creates a new account when email and username are unique and password is valid", async () => {
    const newUser = {
      email: "newuser@test.com",
      username: "newuser",
      password: "password",
    }

    const res = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const { user, token } = res.body

    expect(user.username).toBe("newuser")
    expect(user.email).toBe("newuser@test.com")
    expect(user.passwordHash).toBe(undefined)

    expect(token).toBeTruthy()

    const usersCount = await User.count()
    expect(usersCount).toBe(2)
  })

  it("Doesnt create new account with invalid email", async () => {
    const newUser = {
      email: "existinguser@test.com", // a user with this email already exists
      username: "newuser",
      password: "password",
    }

    await api.post("/api/users").send(newUser).expect(400)

    const usersCount = await User.count()
    expect(usersCount).toBe(1)
  })

  it("Doesnt create new account with invalid password", async () => {
    const newUser = {
      email: "newuser@test.com",
      username: "newuser",
      password: "a", // password is too short
    }

    await api.post("/api/users").send(newUser).expect(400)

    const usersCount = await User.count()
    expect(usersCount).toBe(1)
  })
})
