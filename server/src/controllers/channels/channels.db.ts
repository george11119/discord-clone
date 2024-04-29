import { db } from "../../config/db"
import { Channel } from "../../models/channel"
import { Server } from "../../models/server"
import { ChannelType } from "../../../../types"

const getChannelsFromServerId = async (userId: string, serverId: string) => {
  if (!userId || !serverId) return null

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

const createChannel = async (
  name: string,
  serverId: string,
  channelType?: ChannelType,
) => {
  const server = await Server.findOne({
    where: { id: serverId },
  })
  const ct: ChannelType = channelType ? channelType : ChannelType.TEXT
  const channel = Channel.create({ name, channelType: ct })

  if (server) {
    channel.server = server
    await channel.save()
    return { ...channel, serverId: channel.server.id }
  }
}

const updateChannel = async (name: string, channelId: string) => {
  if (!channelId) return null

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
  if (!channelId) return null
  await Channel.delete({ id: channelId })
}

export default {
  getChannelsFromServerId,
  createChannel,
  updateChannel,
  deleteChannel,
}
