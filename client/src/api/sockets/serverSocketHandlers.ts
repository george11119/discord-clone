import { useEffect } from "react"
import { Server } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useQueryClient } from "@tanstack/react-query"

const useServerDeleteListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onServerDelete = (serverId: string) => {
      const oldServers = queryClient.getQueryData(["servers"]) as Server[]
      const newServers = oldServers.filter((s) => s.id !== serverId)

      queryClient.setQueryData(["servers"], newServers)
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
