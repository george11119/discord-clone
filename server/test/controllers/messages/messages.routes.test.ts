import supertest from "supertest"
import { server } from "../../../src/app"
import { dbSetupAndTeardown } from "../../helpers"
import { beforeEach, describe } from "@jest/globals"
import { UserServers } from "../../../src/models/userServers"
import { User } from "../../../src/models/user"
import { Server } from "../../../src/models/server"
import { Channel } from "../../../src/models/channel"
import { Message } from "../../../src/models/message"

const api = supertest(server)
const url = "/api/messages"

dbSetupAndTeardown()

describe(`${url}`, () => {
  beforeEach(async () => {
    await UserServers.delete({})
    await Server.delete({})
    await User.delete({})
    await Channel.delete({})
    await Message.delete({})
  })
})
