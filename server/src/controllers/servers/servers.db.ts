import { User } from "../../models/user"

const getServers = async (userId: string) => {
  const user = await User.findOne({
    where: { id: userId },
    relations: {
      userServers: {
        server: true,
      },
    },
  })

  const servers = user?.userServers.map((userServer) => userServer.server)

  return servers
}

export default {
  getServers,
}
