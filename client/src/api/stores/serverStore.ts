import { useQueryClient } from "@tanstack/react-query"
import { Server } from "../../../types.ts"

const useServerStore = () => {
  const queryKey = "servers"
  const queryClient = useQueryClient()

  const get = () => {
    const servers = queryClient.getQueryData([queryKey]) as Server[]
    return servers
  }

  const addOne = (newServer: Server) => {
    const oldServers = queryClient.getQueryData([queryKey]) as Server[]
    const newServers = oldServers?.concat(newServer)
    queryClient.setQueryData([queryKey], newServers)
    return newServers
  }

  const updateOne = (editedServer: Server) => {
    const oldServers = queryClient.getQueryData([queryKey]) as Server[]
    const newServers = oldServers.map((s) =>
      s.id === editedServer.id ? editedServer : s,
    )
    queryClient.setQueryData([queryKey], newServers)
    return newServers
  }

  const deleteOne = (serverId: string) => {
    const oldServers = queryClient.getQueryData([queryKey]) as Server[]
    const newServers = oldServers.filter((s) => s.id !== serverId)
    queryClient.setQueryData([queryKey], newServers)
    return newServers
  }

  return { get, addOne, updateOne, deleteOne }
}

export default useServerStore
