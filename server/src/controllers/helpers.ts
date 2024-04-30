import { UserServers } from "../models/userServers"
import { DirectMessage } from "../models/directMessage"

export const isUserInServer = async ({
  userId,
  serverId,
}: {
  userId: string
  serverId: string
}): Promise<boolean> => {
  const userServer = await UserServers.findOneBy({
    userId,
    serverId,
  })

  return userServer ? true : false
}

export const createInverseDirectMessage = async (
  directMessage: DirectMessage,
) => {
  return await DirectMessage.save({
    ownerId: directMessage.recepientId,
    recepientId: directMessage.ownerId,
    channelId: directMessage.channelId,
  })
}
