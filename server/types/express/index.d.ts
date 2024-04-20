import { User as UserModel } from "../../src/models/user"

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

declare module "socket.io" {
  export interface Socket {
    token?: string
    userId?: string
    // other additional attributes here, example:
    // surname?: string;
  }
}
