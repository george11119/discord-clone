import jwt from "jsonwebtoken"
import config from "../config/config"

// what i expect my jwt payload to look like
export type Payload = {
  userId: string
}

// wrapper around jwt.sign
const signToken = (payload: Payload): string => {
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" })
  return token
}

// wrapper around jwt.verify
const verifyToken = (token: string): Payload => {
  const payload = jwt.verify(token, config.JWT_SECRET) as Payload
  return payload
}

export default {
  signToken,
  verifyToken,
}
