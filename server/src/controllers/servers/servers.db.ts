import { db } from "../../config/db"
import { User } from "../../models/user"
import { Server } from "../../models/server"
import { UserServers } from "../../models/userServers"

const getServers = async (userId: string) => {
  const servers = await db.query(
    `
      SELECT "server".*
      FROM "user"
             INNER JOIN "user_servers" ON "user"."id" = "user_servers"."userId"
             INNER JOIN "server" ON "user_servers"."serverId" = "server"."id"
      WHERE "user"."id" = $1
    `,
    [userId],
  )

  return servers
}

const createServer = async ({ user, name }: { user: User; name: string }) => {
  const newServer = await Server.save({ name })
  await UserServers.save({ user, server: newServer })

  return newServer
}

export default {
  getServers,
  createServer,
}
