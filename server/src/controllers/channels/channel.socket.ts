import { io } from "../../app"
import { Channel } from "../../models/channel"

const emitCreatedChannel = async (newChannel: Channel) => {
  io.to(`server-${newChannel.server.id}`).emit("channel:create", newChannel)
}

const emitEditedChannel = async (editedChannel: Channel) => {
  io.to(`server-${editedChannel.server.id}`).emit("channel:edit", editedChannel)
}

const emitChannelDelete = async ({
  channelId,
  serverId,
}: {
  channelId: string
  serverId: string
}) => {
  io.to(`server-${serverId}`).emit("channel:delete", channelId)
}

export default {
  emitCreatedChannel,
  emitEditedChannel,
  emitChannelDelete,
}
