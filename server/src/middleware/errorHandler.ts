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
  }

  next(error)
}