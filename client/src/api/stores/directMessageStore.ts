import { useQueryClient } from "@tanstack/react-query"
import { DirectMessage } from "../../../types.ts"

const useDirectMessagesStore = () => {
  const queryKey = "direct-messages"
  const queryClient = useQueryClient()

  const get = () => {
    const directMessages = queryClient.getQueryData([
      queryKey,
    ]) as DirectMessage[]
    return directMessages
  }

  const addOne = (newDirectMessageRelation: DirectMessage) => {
    const oldDirectMessages = queryClient.getQueryData([
      queryKey,
    ]) as DirectMessage[]
    const newDirectMessages = [newDirectMessageRelation, ...oldDirectMessages]
    queryClient.setQueryData([queryKey], newDirectMessages)
  }

  const updateOne = (editedDirectMessageRelation: DirectMessage) => {
    const oldDirectMessages = queryClient.getQueryData([
      queryKey,
    ]) as DirectMessage[]
    const newDirectMessages = oldDirectMessages.map((dm) =>
      dm.id === editedDirectMessageRelation.id
        ? editedDirectMessageRelation
        : dm,
    )
    queryClient.setQueryData([queryKey], newDirectMessages)
  }

  const syncMessagesSeenCount = (channelId: string) => {
    const oldDirectMessages = queryClient.getQueryData([
      queryKey,
    ]) as DirectMessage[]
    const oldDirectMessage = oldDirectMessages.find(
      (dm) => dm.channel?.id === channelId,
    )
    const newDirectMessage = {
      ...oldDirectMessage,
      seenMessagesCount: oldDirectMessage?.channel?.messageCount,
    } as DirectMessage
    const newDirectMessages = oldDirectMessages.map((dm) =>
      dm.id === newDirectMessage.id ? newDirectMessage : dm,
    )
    queryClient.setQueryData([queryKey], newDirectMessages)
    return newDirectMessages
  }

  const incrementChannelMessageCount = (channelId: string) => {
    const oldDirectMessages = queryClient.getQueryData([
      queryKey,
    ]) as DirectMessage[]
    const oldDirectMessage = oldDirectMessages.find(
      (dm) => dm.channel?.id === channelId,
    )
    const newDirectMessage = {
      ...oldDirectMessage,
      channel: {
        ...oldDirectMessage?.channel,
        messageCount: oldDirectMessage!.channel!.messageCount + 1,
        updatedAt: Date.now(),
      },
    }
    const newDirectMessages = [
      newDirectMessage,
      ...oldDirectMessages.filter((dm) => dm.id !== newDirectMessage.id),
    ]
    queryClient.setQueryData([queryKey], newDirectMessages)
    return newDirectMessages
  }

  return {
    get,
    addOne,
    updateOne,
    syncMessagesSeenCount,
    incrementChannelMessageCount,
  }
}

export default useDirectMessagesStore
