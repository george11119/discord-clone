import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import { useMutation, useQuery } from "@tanstack/react-query"
import userService from "../services/userService.ts"
import { FriendRequest, Friendship, User } from "../../../types.ts"
import useFriendRequestStore from "../stores/friendRequestsStore.ts"
import useFriendsStore from "../stores/friendsStore.ts"

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
  const friendRequestStore = useFriendRequestStore()
  const friendsStore = useFriendsStore()

  return useMutation({
    mutationFn: (username: string) => {
      return userService.sendFriendRequest(token as string, username)
    },
    onSuccess: (createdRelationship: FriendRequest | Friendship) => {
      if (isFriendship(createdRelationship)) {
        friendRequestStore.deleteOne(createdRelationship.friendId as string)
        friendsStore.addOne(createdRelationship.friend)
        return
      }

      friendRequestStore.addSentRequest(createdRelationship)
    },
  })
}

const useDestroyFriendRequest = (userId: string) => {
  const { token } = useContext(AuthContext)
  const friendRequestStore = useFriendRequestStore()

  return useMutation({
    mutationFn: (username: string) => {
      return userService.destroyFriendRequest(token as string, username)
    },
    onSuccess: () => {
      friendRequestStore.deleteOne(userId)
    },
  })
}

const useAcceptFriendRequest = (user: User) => {
  const { token } = useContext(AuthContext)
  const friendRequestStore = useFriendRequestStore()
  const friendsStore = useFriendsStore()

  return useMutation({
    mutationFn: (username: string) => {
      return userService.acceptFriendRequest(token as string, username)
    },
    onSuccess: () => {
      friendRequestStore.deleteOne(user.id)
      friendsStore.addOne(user)
    },
  })
}

const useDestroyFriendship = (userId: string) => {
  const { token } = useContext(AuthContext)
  const friendsStore = useFriendsStore()

  return useMutation({
    mutationFn: (userId: string) => {
      return userService.destroyFriendship(token as string, userId)
    },
    onSuccess: () => {
      friendsStore.deleteOne(userId)
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
