import { db } from "../../config/db"
import { User } from "../../models/user"
import { Server } from "../../models/server"
import { UserServers } from "../../models/userServers"

const getServer = async (
  serverId: string,
  options?: { withChannels?: boolean },
) => {
  if (!serverId) return null
  const server = await Server.findOne({
    where: { id: serverId },
    relations: { channels: options?.withChannels },
  })
  return server
}

const getServers = async (userId: string) => {
  if (!userId) return null

  const servers = await Server.createQueryBuilder("server")
    .innerJoin(UserServers, "user_servers", "user_servers.serverId = server.id")
    .innerJoin(User, "user", "user.id = user_servers.userId")
    .where("user.id = :userId", { userId })
    .orderBy("server.createdAt")
    .getMany()

  return servers
}

const getServersWithChannels = async (userId: string) => {
  if (!userId) return null

  const servers = await Server.createQueryBuilder("server")
    .innerJoin(UserServers, "user_servers", "user_servers.serverId = server.id")
    .innerJoin(User, "user", "user.id = user_servers.userId")
    .leftJoinAndSelect("server.channels", "channel")
    .where("user.id = :userId", { userId })
    .orderBy("server.createdAt")
    .getMany()

  return servers
}

const createServer = async ({ user, name }: { user: User; name: string }) => {
  const newServer = await Server.save({ name })
  await UserServers.save({ user, server: newServer })

  return { ...newServer, channels: [] }
}

const updateServer = async ({
  name,
  serverId,
}: {
  name: string
  serverId: string
}) => {
  await db
    .createQueryBuilder()
    .update(Server)
    .set({ name })
    .where("id = :serverId", { serverId })
    .returning("*")
    .execute()

  const updatedServer = Server.findOne({
    where: { id: serverId },
    relations: { channels: true },
  })

  return updatedServer
}

const deleteServer = async ({ serverId }: { serverId: string }) => {
  if (!serverId) return null
  await Server.delete({ id: serverId })
}

const getUsersOfServer = async (serverId: string) => {
  if (!serverId) return null

  const users = await User.createQueryBuilder("user")
    .innerJoin(UserServers, "user_servers", "user_servers.userId = user.id")
    .innerJoin(Server, "server", "server.id = user_servers.serverId")
    .where("server.id = :serverId", { serverId })
    .orderBy("user.username")
    .getMany()

  return users
}

export default {
  getServer,
  getServers,
  getServersWithChannels,
  createServer,
  updateServer,
  deleteServer,
  getUsersOfServer,
}
