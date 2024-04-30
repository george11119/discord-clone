import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import directMessagesService from "../services/directMessagesService.ts"
import { DirectMessage, User } from "../../../types.ts"
import { useNavigate } from "react-router-dom"

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
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (recepient: User) => {
      const res = directMessagesService.create(token as string, recepient)
      return res
    },
    onSuccess: (newDirectMessageRelation: DirectMessage) => {
      const oldDirectMessages = queryClient.getQueryData([
        "direct-messages",
      ]) as DirectMessage[]
      const newDirectMessages = [newDirectMessageRelation, ...oldDirectMessages]
      queryClient.setQueryData(["direct-messages"], newDirectMessages)
      navigate(`/channels/@me/${newDirectMessageRelation.channel?.id}`)
    },
  })
}

const directMessagesQueries = {
  useGetDirectMessages,
  useCreateDirectMessages,
}

export default directMessagesQueries
