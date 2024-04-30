import { useEffect } from "react"
import { FriendRequest, User } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import useFriendRequestStore from "../stores/friendRequestsStore.ts"
import useFriendsStore from "../stores/friendsStore.ts"

const useFriendRequestReceivedListener = () => {
  const friendRequestStore = useFriendRequestStore()

  return useEffect(() => {
    const onFriendRequestReceived = (receivedFriendRequest: FriendRequest) => {
      friendRequestStore.addReceivedRequest(receivedFriendRequest)
    }

    socket.on("friendRequest:received", onFriendRequestReceived)

    return () => {
      socket.off("friendRequest:received", onFriendRequestReceived)
    }
  }, [])
}

const useDestroyFriendRequestListener = () => {
  const friendRequestStore = useFriendRequestStore()

  return useEffect(() => {
    const onFriendRequestDestroy = (userId: string) => {
      friendRequestStore.deleteOne(userId)
    }

    socket.on("friendRequest:destroy", onFriendRequestDestroy)

    return () => {
      socket.off("friendRequest:destroy", onFriendRequestDestroy)
    }
  }, [])
}

const useFriendRequestAcceptedListener = () => {
  const friendsStore = useFriendsStore()
  const friendRequestStore = useFriendRequestStore()

  return useEffect(() => {
    const onFriendRequestAccepted = (friend: User) => {
      friendRequestStore.deleteOne(friend.id)
      friendsStore.addOne(friend)
    }

    socket.on("friendRequest:accepted", onFriendRequestAccepted)

    return () => {
      socket.off("friendRequest:accepted", onFriendRequestAccepted)
    }
  }, [])
}

const useDestroyFriendshipListener = () => {
  const friendsStore = useFriendsStore()

  useEffect(() => {
    const onFriendshipDestroy = (userId: string) => {
      friendsStore.deleteOne(userId)
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
