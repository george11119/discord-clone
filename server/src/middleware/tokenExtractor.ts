import { Request, Response, NextFunction } from "express"

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "")
  }
  next()
}

export default tokenExtractor
