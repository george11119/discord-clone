import { User } from "../../models/user"

interface SensitiveUser extends Omit<User, "passwordHash"> {}

const removePasswordHash = (user: User): SensitiveUser => {
  const sensitiveUser = user
  // @ts-expect-error idk why this error
  delete user.passwordHash
  return sensitiveUser
}

export default {
  removePasswordHash,
}
