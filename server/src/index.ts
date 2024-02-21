import config from "./utils/config"
import { server } from "./app"
import logger from "./utils/logger"

server.listen(config.PORT, () => {
  logger.info(`Server listening on port ${config.PORT}`)
})

// import { prisma } from "./utils/db"
//
// const a = async () => {
//   await prisma.message.deleteMany({})
// }
// a()
