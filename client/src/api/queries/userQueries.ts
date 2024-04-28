import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import userService from "../services/userService.ts"
import { FriendRequest } from "../../../types.ts"

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
    queryFn: () => userService.getFriendRequests(token as string),
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
      ]) as {
        sent: FriendRequest[]
        received: FriendRequest[]
      }
      const oldSentFriendRequests = oldFriendRequests.sent
      const newSentFriendRequests =
        oldSentFriendRequests.concat(createdFriendRequest)
      const newFriendRequests = {
        ...oldFriendRequests,
        sent: newSentFriendRequests,
      }
      queryClient.setQueryData(["friendRequests"], newFriendRequests)
    },
  })
}

const userQueries = {
  useGetFriends,
  useGetFriendRequests,
  useCreateFriendRequest,
}

export default userQueries
