import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { FriendRequest, FriendRequestItem } from "../../../types.ts"
import { socket } from "../../config/socket.ts"

const useFriendRequestReceivedListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onFriendRequestReceived = (receivedFriendRequest: FriendRequest) => {
      const oldFriendRequests = queryClient.getQueryData([
        "friendRequests",
      ]) as FriendRequestItem[]
      const newFriendRequestItem: FriendRequestItem = {
        type: "received",
        user: receivedFriendRequest.sender,
      }
      const newFriendRequests = oldFriendRequests.concat(newFriendRequestItem)
      queryClient.setQueryData(["friendRequests"], newFriendRequests)
    }

    socket.on("friendRequest:received", onFriendRequestReceived)

    return () => {
      socket.off("friendRequest:received", onFriendRequestReceived)
    }
  }, [])
}

const useDestroyFriendRequestListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onFriendRequestDestroy = (userId: string) => {
      const oldFriendRequests = queryClient.getQueryData([
        "friendRequests",
      ]) as FriendRequestItem[]
      const newFriendRequests = oldFriendRequests.filter(
        (friendRequest) => friendRequest.user.id !== userId,
      )
      queryClient.setQueryData(["friendRequests"], newFriendRequests)
    }

    socket.on("friendRequest:destroy", onFriendRequestDestroy)

    return () => {
      socket.off("friendRequest:destroy", onFriendRequestDestroy)
    }
  }, [])
}

const userSocketHandlers = {
  useFriendRequestReceivedListener,
  useDestroyFriendRequestListener,
}

export default userSocketHandlers
