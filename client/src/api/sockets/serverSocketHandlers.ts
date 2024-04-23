import { useEffect } from "react"
import { Server, User } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { insertIntoUserArray } from "../../utils/insertIntoUserArray.ts"

const useServerEditListener = () => {
  const queryClient = useQueryClient()

  const onServerEdit = (editedServer: Server) => {
    const servers = queryClient.getQueryData(["servers"]) as Server[]
    queryClient.setQueryData(
      ["servers"],
      servers.map((s) => (s.id === editedServer.id ? editedServer : s)),
    )
  }

  socket.on("server:edit", onServerEdit)

  return () => {
    socket.off("server:edit", onServerEdit)
  }
}

const useServerDeleteListener = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useEffect(() => {
    const onServerDelete = (serverId: string) => {
      const oldServers = queryClient.getQueryData(["servers"]) as Server[]
      const newServers = oldServers.filter((s) => s.id !== serverId)

      queryClient.setQueryData(["servers"], newServers)
      if (pathname.match(new RegExp(`.*/${serverId}`))) {
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

const serverSocketHandlers = {
  useServerEditListener,
  useServerDeleteListener,
  useUserJoinServerListener,
}

export default serverSocketHandlers
