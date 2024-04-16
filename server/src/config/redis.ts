import { createClient } from "redis"
import config from "./config"
import logger from "../utils/logger"

export const redisClient = createClient({
  url: config.REDIS_URL,
})

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
