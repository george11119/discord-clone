import { useEffect } from "react"
import { socket } from "../../config/socket.ts"
import { DirectMessage } from "../../../types.ts"
import useDirectMessagesStore from "../stores/directMessageStore.ts"

const useDirectMessageCreateListener = () => {
  const directMessagesStore = useDirectMessagesStore()

  return useEffect(() => {
    const onDirectMessageCreate = (newDirectMessageRelation: DirectMessage) => {
      directMessagesStore.addOne(newDirectMessageRelation)
    }

    socket.on("directMessage:create", onDirectMessageCreate)

    return () => {
      socket.off("directMessage:create", onDirectMessageCreate)
    }
  }, [])
}

const useDirectMessageReceivedListener = () => {
  const directMessagesStore = useDirectMessagesStore()

  return useEffect(() => {
    const onDirectMessageReceived = (channelId: string) => {
      directMessagesStore.incrementChannelMessageCount(channelId)

      const channelIdFromUrl = window.location.pathname.split("/")[3]
      if (channelIdFromUrl === channelId) {
        directMessagesStore.syncMessagesSeenCount(channelId)
      }
    }

    socket.on("directMessage:received", onDirectMessageReceived)

    return () => {
      socket.off("directMessage:received", onDirectMessageReceived)
    }
  }, [])
}

const directMessageSocketHandlers = {
  useDirectMessageCreateListener,
  useDirectMessageReceivedListener,
}

export default directMessageSocketHandlers
