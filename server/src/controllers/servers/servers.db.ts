import { db } from "../../config/db"

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

export default {
  getServers,
}
