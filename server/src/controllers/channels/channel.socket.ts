import { io } from "../../app"
import { Channel } from "../../models/channel"
import { Socket } from "socket.io"

const emitCreatedChannel = async (newChannel: Channel, socket: Socket) => {
  socket.to(`server-${newChannel.server.id}`).emit("channel:create", newChannel)
}

const emitEditedChannel = async (
  editedChannel: Channel,
  serverId: string,
  socket: Socket,
) => {
  socket.to(`server-${serverId}`).emit("channel:edit", editedChannel)
}

const emitChannelDelete = async (
  {
    channelId,
    serverId,
  }: {
    channelId: string
    serverId: string
  },
  socket: Socket,
) => {
  socket.to(`server-${serverId}`).emit("channel:delete", channelId, serverId)
}

export default {
  emitCreatedChannel,
  emitEditedChannel,
  emitChannelDelete,
}
