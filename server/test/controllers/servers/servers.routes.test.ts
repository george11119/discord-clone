import { beforeEach, describe, expect, it } from "@jest/globals"
import supertest from "supertest"
import { server } from "../../../src/app"
import { dbSetupAndTeardown } from "../../helpers"
import { User } from "../../../src/models/user"
import { Server } from "../../../src/models/server"

const api = supertest(server)
const url = "/api/servers"

dbSetupAndTeardown()

describe(`GET ${url}`, () => {
  beforeEach(async () => {
    await User.delete({})
    await Server.delete({})
  })

  it("placeholder", () => {
    expect(true).toBe(true)
  })
})
