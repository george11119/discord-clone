import { Server } from "../../models/server"
import { User } from "../../models/user"

const getServers = async (userId: string) => {
  const user = await User.findOneBy({ id: userId })
  return user
}

export default {
  getServers,
}
