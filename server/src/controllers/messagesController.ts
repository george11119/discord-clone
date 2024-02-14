import { prisma } from "../utils/db"
import { message } from "../../../types"

export const getAllMessages = async (): Promise<message[]> => {
  const messages = await prisma.message.findMany()
  return messages
}

export const createMessage = async ({
  messageBody,
}: {
  messageBody: string
}): Promise<message> => {
  const message = await prisma.message.create({ data: { messageBody } })
  return message
}
