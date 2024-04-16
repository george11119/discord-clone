import { Server } from "../../models/server"
import { Socket } from "socket.io"

const emitEditedServer = async (editedServer: Server, socket: Socket) => {
  socket.emit("server:edit", editedServer)
}

const emitServerDelete = async (serverId: string, socket: Socket) => {
  socket.broadcast.emit("server:delete", serverId)
}

export default {
  emitEditedServer,
  emitServerDelete,
}
