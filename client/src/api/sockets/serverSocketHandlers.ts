import { useEffect } from "react"
import { Server, User } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { insertIntoUserArray } from "../../utils/insertIntoUserArray.ts"
import useServerStore from "../stores/serverStore.ts"

const useServerEditListener = () => {
  const serverStore = useServerStore()

  return useEffect(() => {
    const onServerEdit = (editedServer: Server) => {
      serverStore.updateOne(editedServer)
    }

    socket.on("server:edit", onServerEdit)

    return () => {
      socket.off("server:edit", onServerEdit)
    }
  }, [])
}

const useServerDeleteListener = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const serverStore = useServerStore()

  return useEffect(() => {
    const onServerDelete = (serverId: string) => {
      serverStore.deleteOne(serverId)

      if (pathname.includes(`/channels/${serverId}`)) {
        navigate("/channels/@me")
      }
    }

    socket.on("server:delete", onServerDelete)

    return () => {
      socket.off("server:delete", onServerDelete)
    }
  }, [])
}

const useUserJoinServerListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onUserJoinServer = (user: User, serverId: string) => {
      const oldUsers = queryClient.getQueryData([
        `users`,
        `${serverId}`,
      ]) as User[]
      const newUsers = insertIntoUserArray(oldUsers, user)
      queryClient.setQueryData([`users`, `${serverId}`], newUsers)
    }

    socket.on("user:join", onUserJoinServer)

    return () => {
      socket.off("user:join", onUserJoinServer)
    }
  }, [])
}

const useUserLeaveServerListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onUserLeaveServer = (user: User, serverId: string) => {
      const oldUsers = queryClient.getQueryData([
        `users`,
        `${serverId}`,
      ]) as User[]
      const newUsers = oldUsers.filter((u) => u.username !== user.username)
      queryClient.setQueryData([`users`, `${serverId}`], newUsers)
    }

    socket.on("user:leave", onUserLeaveServer)

    return () => {
      socket.off("user:leave", onUserLeaveServer)
    }
  })
}

const serverSocketHandlers = {
  useServerEditListener,
  useServerDeleteListener,
  useUserJoinServerListener,
  useUserLeaveServerListener,
}

export default serverSocketHandlers
