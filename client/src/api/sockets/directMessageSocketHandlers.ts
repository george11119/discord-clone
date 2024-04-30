import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { socket } from "../../config/socket.ts"
import { DirectMessage } from "../../../types.ts"

const useDirectMessageCreateListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onDirectMessageCreate = (newDirectMessageRelation: DirectMessage) => {
      const oldDirectMessages = queryClient.getQueryData([
        "direct-messages",
      ]) as DirectMessage[]
      const newDirectMessages = [newDirectMessageRelation, ...oldDirectMessages]
      queryClient.setQueryData(["direct-messages"], newDirectMessages)
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
