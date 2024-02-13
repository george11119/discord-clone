import { prisma } from "../utils/db"
import { Message } from "../types"

export const getAllMessages = async (): Promise<Message[]> => {
  const messages = await prisma.message.findMany()
  return messages
}

export const createMessage = async ({
  messageBody,
}: {
  messageBody: string
}): Promise<Message> => {
  const message = await prisma.message.create({ data: { messageBody } })
  return message
}
