import { db } from "../../config/db"

const getChannels = async (userId: string, serverId: string) => {
  const channels = await db.query(
    `
        SELECT "channel".*
        FROM "server"
                 JOIN "channel" ON "server"."id" = "channel"."serverId"
        WHERE "channel"."serverId" = $1
    `,
    [serverId],
  )

  return channels
}

export default {
  getChannels,
}
