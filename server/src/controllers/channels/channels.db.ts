import { Server } from "../../models/server"

const getChannels = async (userId: string, serverId: string) => {
  try {
    const server = await Server.findOne({
      where: { id: serverId },
      relations: {
        channels: true,
      },
    })

    return server ? server.channels : []
  } catch (e: any) {
    if (e.name === "QueryFailedError") {
      return null
    }
  }
}

export default {
  getChannels,
}
