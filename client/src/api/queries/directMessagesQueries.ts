import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import { useMutation, useQuery } from "@tanstack/react-query"
import directMessagesService from "../services/directMessagesService.ts"
import { DirectMessage, User } from "../../../types.ts"
import { useNavigate, useParams } from "react-router-dom"
import useDirectMessagesStore from "../stores/directMessageStore.ts"
import { c } from "vite/dist/node/types.d-aGj9QkWt"

const useGetDirectMessages = () => {
  const { token } = useContext(AuthContext)

  return useQuery({
    queryKey: ["direct-messages"],
    queryFn: async () => {
      return directMessagesService.get(token as string)
    },
  })
}

const useCreateDirectMessages = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const directMessagesStore = useDirectMessagesStore()

  return useMutation({
    mutationFn: (recepient: User) => {
      const res = directMessagesService.create(token as string, recepient)
      return res
    },
    onSuccess: (newDirectMessageRelation: DirectMessage) => {
      directMessagesStore.addOne(newDirectMessageRelation)
      navigate(`/channels/@me/${newDirectMessageRelation.channel?.id}`)
    },
  })
}

const useUpdateSeenMessagesCount = (directMessage: DirectMessage) => {
  const { token } = useContext(AuthContext)
  const directMessagesStore = useDirectMessagesStore()

  return useMutation({
    mutationFn: (directMessageId: string) => {
      const res = directMessagesService.updateSeenCount(
        token as string,
        directMessageId,
      )
      return res
    },
    onSuccess: () => {
      const editedDirectMessage = {
        ...directMessage,
        seenMessagesCount: directMessage.channel?.messageCount,
      } as DirectMessage
      directMessagesStore.updateOne(editedDirectMessage)
    },
  })
}

const directMessagesQueries = {
  useGetDirectMessages,
  useCreateDirectMessages,
  useUpdateSeenMessagesCount,
}

export default directMessagesQueries
