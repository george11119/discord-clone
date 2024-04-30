import { useQueryClient } from "@tanstack/react-query"
import { User } from "../../../types.ts"
import { insertIntoUserArray } from "../../utils/insertIntoUserArray.ts"

const useServerMemberStore = () => {
  const queryKey = "server-members"
  const queryClient = useQueryClient()

  const addOne = (serverId: string, user: User) => {
    const oldUsers = queryClient.getQueryData([
      queryKey,
      `${serverId}`,
    ]) as User[]
    const newUsers = insertIntoUserArray(oldUsers, user)
    queryClient.setQueryData([queryKey, `${serverId}`], newUsers)
    return newUsers
  }

  const deleteOne = (serverId: string, user: User) => {
    const oldUsers = queryClient.getQueryData([
      "server-members",
      `${serverId}`,
    ]) as User[]
    const newUsers = oldUsers.filter((u) => u.username !== user.username)
    queryClient.setQueryData(["server-members", `${serverId}`], newUsers)
    return newUsers
  }

  return { addOne, deleteOne }
}

export default useServerMemberStore
