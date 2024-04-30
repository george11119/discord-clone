import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import { useQuery } from "@tanstack/react-query"
import directMessagesService from "../services/directMessagesService.ts"

const useGetDirectMessages = () => {
  const { token } = useContext(AuthContext)

  return useQuery({
    queryKey: ["direct-messages"],
    queryFn: async () => {
      return directMessagesService.get(token as string)
    },
  })
}

const directMessagesQueries = {
  useGetDirectMessages,
}

export default directMessagesQueries
