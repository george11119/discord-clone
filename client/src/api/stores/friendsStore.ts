import { useQueryClient } from "@tanstack/react-query"
import { User } from "../../../types.ts"
import { insertIntoUserArray } from "../../utils/insertIntoUserArray.ts"

const useFriendsStore = () => {
  const queryKey = "friends"
  const queryClient = useQueryClient()

  const get = () => {
    const friends = queryClient.getQueryData([queryKey]) as User[]
    return friends
  }

  const addOne = (newFriend: User) => {
    const oldFriends = queryClient.getQueryData([queryKey]) as User[]
    const newFriends = insertIntoUserArray(oldFriends, newFriend)
    queryClient.setQueryData([queryKey], newFriends)
    return newFriends
  }

  const deleteOne = (userId: string) => {
    const oldFriends = queryClient.getQueryData([queryKey]) as User[]
    const newFriends = oldFriends.filter((friend) => friend.id !== userId)
    queryClient.setQueryData([queryKey], newFriends)
    return newFriends
  }

  return { get, addOne, deleteOne }
}

export default useFriendsStore
