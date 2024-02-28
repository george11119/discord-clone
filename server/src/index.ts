import config from "./config/config"
import { server } from "./app"
import logger from "./utils/logger"

server.listen(config.PORT, () => {
  logger.info(`Server listening on port ${config.PORT}`)
})
