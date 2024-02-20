import config from "./utils/config"
import { server } from "./app"

server.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`)
})
