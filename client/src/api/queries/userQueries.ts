import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import userService from "../services/userService.ts"
import { FriendRequest, FriendRequestItem } from "../../../types.ts"

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
    onSuccess: (createdFriendRequest: FriendRequest) => {
      const oldFriendRequests = queryClient.getQueryData([
        "friendRequests",
      ]) as FriendRequestItem[]
      const newFriendRequestItem: FriendRequestItem = {
        type: "sent",
        user: createdFriendRequest.receiver,
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

const userQueries = {
  useGetFriends,
  useGetFriendRequests,
  useCreateFriendRequest,
  useDestroyFriendRequest,
}

export default userQueries
