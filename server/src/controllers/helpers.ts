import { User } from "../models/user"
import { Server } from "../models/server"
import { UserServers } from "../models/userServers"

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
