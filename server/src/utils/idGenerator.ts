import { customAlphabet } from "nanoid"

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

const generateInviteLinkId = customAlphabet(alphabet, 16)

const idGenerator = {
  generateInviteLinkId,
}

export default idGenerator
