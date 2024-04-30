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

  return { get, addOne }
}

export default useDirectMessagesStore
