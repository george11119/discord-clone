import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { FriendRequest, FriendRequestItem, User } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { insertIntoUserArray } from "../../utils/insertIntoUserArray.ts"

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

const useFriendRequestAcceptedListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onFriendRequestAccepted = (friend: User) => {
      const oldFriendRequests = queryClient.getQueryData([
        "friendRequests",
      ]) as FriendRequestItem[]
      const newFriendRequests = oldFriendRequests.filter(
        (friendRequest) => friendRequest.user.id !== friend.id,
      )
      queryClient.setQueryData(["friendRequests"], newFriendRequests)

      const oldFriends = queryClient.getQueryData(["friends"]) as User[]
      const newFriends = insertIntoUserArray(oldFriends, friend)
      queryClient.setQueryData(["friends"], newFriends)
    }

    socket.on("friendRequest:accepted", onFriendRequestAccepted)

    return () => {
      socket.off("friendRequest:accepted", onFriendRequestAccepted)
    }
  }, [])
}

const useDestroyFriendshipListener = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const onFriendshipDestroy = (userId: string) => {
      const oldFriends = queryClient.getQueryData(["friends"]) as User[]
      const newFriends = oldFriends.filter((friend) => friend.id !== userId)
      queryClient.setQueryData(["friends"], newFriends)
    }

    socket.on("friendship:destroy", onFriendshipDestroy)

    return () => {
      socket.off("friendship:destroy", onFriendshipDestroy)
    }
  }, [])
}

const userSocketHandlers = {
  useFriendRequestReceivedListener,
  useDestroyFriendRequestListener,
  useFriendRequestAcceptedListener,
  useDestroyFriendshipListener,
}

export default userSocketHandlers
