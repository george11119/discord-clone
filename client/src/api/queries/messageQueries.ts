import { useMutation, useQuery } from "@tanstack/react-query"
import messageService from "../services/messageService.ts"
import { Message } from "../../../types.ts"
import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import useMessageStore from "../stores/messageStore.ts"
import { ChannelType } from "../../../../types.ts"
import useDirectMessagesStore from "../stores/directMessageStore.ts"

const useGetMessages = (channelId: string | undefined) => {
  const { token } = useContext(AuthContext)

  return useQuery({
    queryKey: ["messages", `${channelId}`],
    queryFn: () => messageService.get(token as string, channelId as string),
    staleTime: Infinity,
  })
}

const useCreateMessage = (channelId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const messageStore = useMessageStore()
  const directMessagesStore = useDirectMessagesStore()

  return useMutation({
    mutationFn: (newMessage: { content: string }) => {
      const res = messageService.create(
        token as string,
        newMessage,
        channelId as string,
      )
      return res
    },
    onSuccess: (newMessage: Message) => {
      messageStore.addOne(newMessage)
      if (newMessage.channel?.channelType === ChannelType.DIRECT_MESSAGE) {
        directMessagesStore.incrementChannelMessageCount(newMessage.channel.id)
        directMessagesStore.syncMessagesSeenCount(newMessage.channel.id)
      }
    },
  })
}

const useEditMessage = (channelId: string | undefined, message: Message) => {
  const { token } = useContext(AuthContext)
  const messageStore = useMessageStore()

  return useMutation({
    mutationFn: (editedMessage: { content: string }) => {
      return messageService.update(
        token as string,
        editedMessage,
        channelId as string,
        message.id,
      )
    },
    onSuccess: (editedMessage: Message) => {
      messageStore.updateOne(editedMessage)
    },
  })
}

const useDeleteMessage = (
  channelId: string | undefined,
  messageId: string | undefined,
) => {
  const { token } = useContext(AuthContext)
  const messageStore = useMessageStore()

  return useMutation({
    mutationFn: () => {
      return messageService.destroy(
        token as string,
        channelId as string,
        messageId as string,
      )
    },
    onSuccess: () => {
      messageStore.deleteOne(channelId as string, messageId as string)
    },
  })
}

const messageQueries = {
  useGetMessages,
  useCreateMessage,
  useEditMessage,
  useDeleteMessage,
}

export default messageQueries
