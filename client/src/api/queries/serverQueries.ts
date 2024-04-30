import { useMutation, useQuery } from "@tanstack/react-query"
import serverService from "../services/serverService.ts"
import { Server } from "../../../types.ts"
import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import useServerStore from "../stores/serverStore.ts"

const useGetServers = () => {
  const { token } = useContext(AuthContext)

  return useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      const servers = await serverService.get(token as string)
      return servers
    },
  })
}

const useCreateServer = () => {
  const { token } = useContext(AuthContext)
  const serverStore = useServerStore()

  return useMutation({
    mutationFn: (newServer: { name: string }) => {
      return serverService.create(newServer, token as string)
    },
    onSuccess: (newServer: Server) => {
      serverStore.addOne(newServer)
    },
  })
}

const useEditServer = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const serverStore = useServerStore()

  return useMutation({
    mutationFn: (updatedServer: { name: string }) => {
      return serverService.update(
        serverId as string,
        updatedServer,
        token as string,
      )
    },
    onSuccess: (editedServer: Server) => {
      serverStore.updateOne(editedServer)
    },
  })
}

const useDeleteServer = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const serverStore = useServerStore()

  return useMutation({
    mutationFn: () => {
      return serverService.destroy(serverId as string, token as string)
    },
    onSuccess: () => {
      serverStore.deleteOne(serverId as string)
    },
  })
}

const useLeaveServer = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const serverStore = useServerStore()

  return useMutation({
    mutationFn: () => {
      return serverService.leaveServer(serverId as string, token as string)
    },
    onSuccess: () => {
      serverStore.deleteOne(serverId as string)
    },
  })
}

const useGetUsersOfServer = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)

  return useQuery({
    queryKey: [`users`, `${serverId}`],
    queryFn: () => serverService.getUsers(token as string, serverId as string),
    staleTime: Infinity,
  })
}

const serverQueries = {
  useCreateServer,
  useGetServers,
  useEditServer,
  useDeleteServer,
  useLeaveServer,
  useGetUsersOfServer,
}

export default serverQueries
