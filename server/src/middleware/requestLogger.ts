import logger from "../utils/logger"
import { Request, Response, NextFunction } from "express"

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("Method:", req.method)
  logger.info("Path:  ", req.path)
  logger.info("body:  ", req.body)
  logger.info("---")
  next()
}
