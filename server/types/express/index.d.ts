import { User as UserModel } from "../../src/models/user"
import { JwtPayload } from "jsonwebtoken"

export {}

declare global {
  namespace Express {
    export interface User extends UserModel {}

    export interface Request {
      token?: string
      user?: UserModel
    }
  }
}
