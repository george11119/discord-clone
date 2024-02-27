import { User as UserModel } from "../../src/models/user"

export {}

declare global {
  namespace Express {
    export interface Request {
      token?: string
      user?: UserModel
    }
  }
}
