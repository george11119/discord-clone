import { afterAll, beforeAll } from "@jest/globals"
import { db } from "../src/config/db"

export const dbSetupAndTeardown = () => {
  beforeAll(async () => {
    // start up database connection
    await db.initialize()
  })

  afterAll(async () => {
    // clear out database and close database connection
    await db.dropDatabase()
    await db.destroy()
  })
}
