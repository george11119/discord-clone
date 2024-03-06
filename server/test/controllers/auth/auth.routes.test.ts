import { expect, it, describe, beforeEach } from "@jest/globals"
import bcrypt from "bcrypt"
import { User } from "../../../src/models/user"
import supertest from "supertest"
import { server } from "../../../src/app"
import jwtUtils from "../../../src/utils/jwtUtils"
import { dbSetupAndTeardown } from "../../helpers"

dbSetupAndTeardown()

const api = supertest(server)
const url = "/api/auth"

describe(`POST ${url}/login`, () => {
  beforeEach(async () => {
    await User.delete({})

    await User.save({
      username: "testusername",
      email: "test@test.com",
      passwordHash: await bcrypt.hash("password", 10), // password is "password"
    })
  }, 10000)

  it("Logs in successfully with correct username and password", async () => {
    const loginCredentials = {
      email: "test@test.com",
      password: "password",
    }
    const res = await api
      .post(`${url}/login`)
      .send(loginCredentials)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const { token } = res.body

    expect(token).toBeTruthy()
  })

  it("Does not login with invalid email", async () => {
    const loginCredentials = {
      email: "invalidemail@test.com",
      password: "password",
    }

    await api.post(`${url}/login`).send(loginCredentials).expect(401)
  })

  it("Does not login with invalid password", async () => {
    const loginCredentials = {
      email: "test@test.com",
      password: "invalidpassword",
    }

    await api.post(`${url}/login`).send(loginCredentials).expect(401)
  })
})

describe(`GET ${url}/logged_in`, () => {
  beforeEach(async () => {
    await User.delete({})

    await User.save({
      username: "testusername",
      email: "test@test.com",
      passwordHash: await bcrypt.hash("password", 10), // password is "password"
    })
  }, 10000)

  it("Returns true if authorization header with valid token in request", async () => {
    const user = await User.findOneBy({ username: "testusername" })
    const token = jwtUtils.signToken({ userId: user?.id as string })

    const res = await api
      .get(`${url}/logged_in`)
      .set("authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const { loggedIn } = res.body
    expect(loggedIn).toBe(true)
  })

  it("Returns false if no authorization header in request", async () => {
    const res = await api
      .get(`${url}/logged_in`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const { loggedIn } = res.body
    expect(loggedIn).toBe(false)
  })
})
