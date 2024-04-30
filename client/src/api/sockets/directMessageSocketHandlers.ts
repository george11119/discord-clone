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

const directMessageSocketHandlers = {
  useDirectMessageCreateListener,
}

export default directMessageSocketHandlers
