import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import userService from "../services/userService.ts"
import {
  FriendRequest,
  FriendRequestItem,
  Friendship,
  User,
} from "../../../types.ts"
import { insertIntoUserArray } from "../../utils/insertIntoUserArray.ts"

const isFriendship = (obj: any): obj is Friendship => {
  return obj.owner !== undefined
}

const useGetFriends = () => {
  const { token } = useContext(AuthContext)

  return useQuery({
    queryKey: ["friends"],
    queryFn: () => userService.getFriends(token as string),
  })
}

const useGetFriendRequests = () => {
  const { token } = useContext(AuthContext)

  return useQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => {
      const { sent, received } = (await userService.getFriendRequests(
        token as string,
      )) as {
        sent: FriendRequest[]
        received: FriendRequest[]
      }

      const sentList = sent.map((sentRequest) => {
        return { type: "sent", user: sentRequest.receiver }
      })
      const receivedList = received.map((receivedRequest) => {
        return { type: "received", user: receivedRequest.sender }
      })
      return [...receivedList, ...sentList]
    },
  })
}

const useCreateFriendRequest = () => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (username: string) => {
      return userService.sendFriendRequest(token as string, username)
    },
    onSuccess: (createdRelationship: FriendRequest | Friendship) => {
      if (isFriendship(createdRelationship)) {
        const oldFriendRequests = queryClient.getQueryData([
          "friendRequests",
        ]) as FriendRequestItem[]
        const newFriendRequests = oldFriendRequests.filter(
          (friendRequest) =>
            friendRequest.user.id !== createdRelationship.friendId,
        )
        queryClient.setQueryData(["friendRequests"], newFriendRequests)

        const oldFriends = queryClient.getQueryData(["friends"]) as User[]
        const newFriends = insertIntoUserArray(
          oldFriends,
          createdRelationship.friend,
        )
        queryClient.setQueryData(["friends"], newFriends)
        return
      }

      const oldFriendRequests = queryClient.getQueryData([
        "friendRequests",
      ]) as FriendRequestItem[]
      const newFriendRequestItem: FriendRequestItem = {
        type: "sent",
        user: createdRelationship.receiver,
      }
      const newFriendRequests = oldFriendRequests.concat(newFriendRequestItem)
      queryClient.setQueryData(["friendRequests"], newFriendRequests)
    },
  })
}

const useDestroyFriendRequest = (userId: string) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (username: string) => {
      return userService.destroyFriendRequest(token as string, username)
    },
    onSuccess: () => {
      const oldFriendRequests = queryClient.getQueryData([
        "friendRequests",
      ]) as FriendRequestItem[]
      const newFriendRequests = oldFriendRequests.filter(
        (friendRequest) => friendRequest.user.id !== userId,
      )
      queryClient.setQueryData(["friendRequests"], newFriendRequests)
    },
  })
}

const useAcceptFriendRequest = (userId: string) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (username: string) => {
      return userService.acceptFriendRequest(token as string, username)
    },
    onSuccess: () => {
      const oldFriendRequests = queryClient.getQueryData([
        "friendRequests",
      ]) as FriendRequestItem[]
      const newFriendRequests = oldFriendRequests.filter(
        (friendRequest) => friendRequest.user.id !== userId,
      )
      queryClient.setQueryData(["friendRequests"], newFriendRequests)

      const friendRequestSender = oldFriendRequests.find(
        (fr) => fr.user.id === userId,
      )?.user as User
      const oldFriends = queryClient.getQueryData(["friends"]) as User[]
      const newFriends = insertIntoUserArray(oldFriends, friendRequestSender)
      queryClient.setQueryData(["friends"], newFriends)
    },
  })
}

const useDestroyFriendship = (userId: string) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => {
      return userService.destroyFriendship(token as string, userId)
    },
    onSuccess: () => {
      const oldFriends = queryClient.getQueryData(["friends"]) as User[]
      const newFriends = oldFriends.filter((friend) => friend.id !== userId)
      queryClient.setQueryData(["friends"], newFriends)
    },
  })
}

const userQueries = {
  useGetFriends,
  useGetFriendRequests,
  useCreateFriendRequest,
  useDestroyFriendRequest,
  useAcceptFriendRequest,
  useDestroyFriendship,
}

export default userQueries
