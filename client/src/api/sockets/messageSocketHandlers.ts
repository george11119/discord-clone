import { useEffect } from "react"
import { Message } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import useMessageStore from "../stores/messageStore.ts"

const useMessageCreateListener = () => {
  const messageStore = useMessageStore()

  return useEffect(() => {
    const onMessageCreate = (newMessage: Message) => {
      messageStore.addOne(newMessage)
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
