import { prisma } from "../../utils/db"
import { message } from "../../../../types"

const getAllMessages = async (): Promise<message[]> => {
  const messages = await prisma.message.findMany()
  return messages
}

const createNewMessage = async ({
  messageBody,
}: {
  messageBody: string
}): Promise<message> => {
  const message = await prisma.message.create({ data: { messageBody } })
  return message
}

export default {
  getAllMessages,
  createNewMessage,
}
