import { useEffect } from "react"
import { Message } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import useMessageStore from "../stores/messageStore.ts"
import { ChannelType } from "../../../../types.ts"
import useDirectMessagesStore from "../stores/directMessageStore.ts"
import directMessagesQueries from "../queries/directMessagesQueries.ts"

const useMessageCreateListener = () => {
  const messageStore = useMessageStore()
  const directMessagesStore = useDirectMessagesStore()
  const updateSeenMessagesCountMutation =
    directMessagesQueries.useUpdateSeenMessagesCount(
      window.location.pathname.split("/")[3],
    )

  return useEffect(() => {
    const onMessageCreate = (newMessage: Message) => {
      const channelId = window.location.pathname.split("/")[3]
      messageStore.addOne(newMessage)
      if (
        newMessage.channel?.channelType === ChannelType.DIRECT_MESSAGE &&
        channelId === newMessage.channel.id
      ) {
        const directMessageId = directMessagesStore
          .get()
          .find((dm) => dm.channel?.id === channelId)?.id
        updateSeenMessagesCountMutation.mutate(directMessageId as string)
      }
    }

    socket.on("message:create", onMessageCreate)

    return () => {
      socket.off("message:create", onMessageCreate)
    }
  }, [])
}

const useMessageEditListener = () => {
  const messageStore = useMessageStore()

  return useEffect(() => {
    const onMessageEdit = (editedMessage: Message) => {
      messageStore.updateOne(editedMessage)
    }

    socket.on("message:edit", onMessageEdit)

    return () => {
      socket.off("message:edit", onMessageEdit)
    }
  }, [])
}

const useMessageDeleteListener = () => {
  const messageStore = useMessageStore()

  return useEffect(() => {
    const onMessageDelete = (
      deletedMessageId: string,
      deletedMessageChannelId: string,
    ) => {
      messageStore.deleteOne(deletedMessageChannelId, deletedMessageId)
    }

    socket.on("message:delete", onMessageDelete)

    return () => {
      socket.off("message:delete", onMessageDelete)
    }
  }, [])
}

const messageSocketHandlers = {
  useMessageCreateListener,
  useMessageEditListener,
  useMessageDeleteListener,
}

export default messageSocketHandlers
