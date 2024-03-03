import { Request, Response, NextFunction } from "express"
import jwtUtils from "../utils/jwtUtils"
import { User } from "../models/user"

export const authenticatedValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const decodedToken = jwtUtils.verifyToken(req.token as string)

  if (!decodedToken.userId) {
    return res.status(401).json({ message: "JWT token invalid" })
  }

  const user = await User.findOneBy({ id: decodedToken.userId })
  if (user !== null) {
    req.user = user
  }

  next()
}
