import logger from "../utils/logger"
import { Request, Response, NextFunction } from "express"

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("AN ERROR OCCURED")
  logger.error("Error name:", error.name)
  logger.error("Error message:", error.message)
  logger.error("---")
  logger.error(error)

  if (error.name === "QueryFailedError") {
    res.status(400).json({ error: error.detail })
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: error.message })
  } else if (error.name === "SyntaxError") {
    res.status(401).json({ error: "invalid token" })
  } else {
    res.status(500).json({ error: "Internal server error" })
  }

  next(error)
}
