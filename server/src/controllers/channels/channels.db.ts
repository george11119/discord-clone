import { db } from "../../config/db"
import { Channel } from "../../models/channel"
import { Server } from "../../models/server"

const getChannels = async (userId: string, serverId: string) => {
  const channels = await db.query(
    `
        SELECT "channel".*
        FROM "server"
                 JOIN "channel" ON "server"."id" = "channel"."serverId"
        WHERE "channel"."serverId" = $1
        ORDER BY "channel"."createdAt"
    `,
    [serverId],
  )

  return channels
}

const createChannel = async (name: string, serverId: string) => {
  const server = await Server.findOne({
    where: { id: serverId },
  })
  const channel = Channel.create({ name })

  if (server) {
    channel.server = server
    await channel.save()
    return { ...channel, serverId: channel.server.id }
  }
}

const updateChannel = async (name: string, channelId: string) => {
  const updatedChannel = (
    await db
      .createQueryBuilder()
      .update(Channel)
      .set({ name })
      .where("id = :channelId", { channelId })
      .returning("*")
      .execute()
  ).raw[0]

  return updatedChannel
}

const deleteChannel = async (channelId: string) => {
  await Channel.delete({ id: channelId })
}

export default {
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
}
