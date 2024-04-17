import { createClient } from "redis"
import config from "./config"
import logger from "../utils/logger"

export const redisClient = createClient({
  url: config.REDIS_URL,
})

// clears out redis database
export const clearRedis = async () => {
  const client = createClient({ url: config.REDIS_URL })
  await client.connect()
  await client.flushAll()
  await client.quit()
}

export const initializeRedisClient = async () => {
  try {
    // dont run in jest tests
    if (process.env.JEST !== "true") {
      await redisClient.connect()
      logger.info("Redis client initialized")
    }
  } catch (e) {
    logger.error("Redis client initialization error", e)
  }
}
