import { useEffect } from "react"
import { Server } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"

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

const serverSocketHandlers = {
  useServerDeleteListener,
}

export default serverSocketHandlers
