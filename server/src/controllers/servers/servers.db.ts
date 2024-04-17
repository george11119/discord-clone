import { db } from "../../config/db"
import { User } from "../../models/user"
import { Server } from "../../models/server"
import { UserServers } from "../../models/userServers"

const getServer = async (serverId: string) => {
  if (!serverId) return null
  const server = await Server.findOne({ where: { id: serverId } })
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

  return newServer
}

const updateServer = async ({
  name,
  serverId,
}: {
  name: string
  serverId: string
}) => {
  const updatedServer = (
    await db
      .createQueryBuilder()
      .update(Server)
      .set({ name })
      .where("id = :serverId", { serverId })
      .returning("*")
      .execute()
  ).raw[0]

  return updatedServer
}

const deleteServer = async ({ serverId }: { serverId: string }) => {
  if (!serverId) return null
  await Server.delete({ id: serverId })
}

export default {
  getServer,
  getServers,
  getServersWithChannels,
  createServer,
  updateServer,
  deleteServer,
}
