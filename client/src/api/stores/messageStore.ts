import { useQueryClient } from "@tanstack/react-query"
import { Message } from "../../../types.ts"

const useMessageStore = () => {
  const queryKey = "messages"
  const queryClient = useQueryClient()

  const addOne = (newMessage: Message) => {
    const oldMessages = queryClient.getQueryData([
      queryKey,
      `${newMessage.channel?.id}`,
    ]) as Message[]
    const newMessages = oldMessages?.concat(newMessage)
    queryClient.setQueryData(
      [queryKey, `${newMessage.channel?.id}`],
      newMessages,
    )
    return newMessages
  }

  const updateOne = (editedMessage: Message) => {
    const oldMessages = queryClient.getQueryData([
      queryKey,
      `${editedMessage.channel?.id}`,
    ]) as Message[]
    const newMessages = oldMessages.map((m) =>
      m.id === editedMessage.id ? editedMessage : m,
    )
    queryClient.setQueryData(
      [queryKey, `${editedMessage.channel?.id}`],
      newMessages,
    )
    return newMessages
  }

  const deleteOne = (channelId: string, messageId: string) => {
    const oldMessages = queryClient.getQueryData([
      queryKey,
      `${channelId}`,
    ]) as Message[]
    const newMessages = oldMessages.filter((m) => m.id !== messageId)
    queryClient.setQueryData([queryKey, `${channelId}`], newMessages)
    return newMessages
  }

  return { addOne, updateOne, deleteOne }
}

export default useMessageStore
