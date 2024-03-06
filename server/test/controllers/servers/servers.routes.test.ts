import { describe, expect, it } from "@jest/globals"
import supertest from "supertest"
import { server } from "../../../src/app"
import { dbSetupAndTeardown } from "../../helpers"

const api = supertest(server)
const url = "/api/servers"

dbSetupAndTeardown()

describe(`GET ${url}`, () => {
  it("placeholder", () => {
    expect(true).toBe(true)
  })
})
