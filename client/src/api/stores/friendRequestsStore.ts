import { useQueryClient } from "@tanstack/react-query"
import { FriendRequest, FriendRequestItem } from "../../../types.ts"

const useFriendRequestStore = () => {
  const queryKey = "friendRequests"
  const queryClient = useQueryClient()

  const addSentRequest = (createdRelationship: FriendRequest) => {
    const oldFriendRequests = queryClient.getQueryData([
      queryKey,
    ]) as FriendRequestItem[]
    const newFriendRequestItem: FriendRequestItem = {
      type: "sent",
      user: createdRelationship.receiver,
    }
    const newFriendRequests = oldFriendRequests.concat(newFriendRequestItem)
    queryClient.setQueryData([queryKey], newFriendRequests)
    return newFriendRequests
  }

  const addReceivedRequest = (createdRelationship: FriendRequest) => {
    const oldFriendRequests = queryClient.getQueryData([
      queryKey,
    ]) as FriendRequestItem[]
    const newFriendRequestItem: FriendRequestItem = {
      type: "received",
      user: createdRelationship.sender,
    }
    const newFriendRequests = oldFriendRequests.concat(newFriendRequestItem)
    queryClient.setQueryData([queryKey], newFriendRequests)
    return newFriendRequests
  }

  const deleteOne = (userId: string) => {
    const oldFriendRequests = queryClient.getQueryData([
      queryKey,
    ]) as FriendRequestItem[]
    const newFriendRequests = oldFriendRequests.filter(
      (friendRequest) => friendRequest.user.id !== userId,
    )
    queryClient.setQueryData([queryKey], newFriendRequests)
    return newFriendRequests
  }

  return { addSentRequest, addReceivedRequest, deleteOne }
}

export default useFriendRequestStore
