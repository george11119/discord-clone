import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import serverService from "../services/serverService.ts"
import { Server } from "../../../types.ts"
import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"

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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newServer: { name: string }) => {
      return serverService.create(newServer, token as string)
    },
    onSuccess: (newServer) => {
      const servers = queryClient.getQueryData(["servers"]) as Server[]
      queryClient.setQueryData(["servers"], servers?.concat(newServer))
    },
  })
}

const useEditServer = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedServer: { name: string }) => {
      return serverService.update(
        serverId as string,
        updatedServer,
        token as string,
      )
    },
    onSuccess: (editedServer) => {
      const servers = queryClient.getQueryData(["servers"]) as Server[]
      queryClient.setQueryData(
        ["servers"],
        servers.map((s) => (s.id === serverId ? editedServer : s)),
      )
    },
  })
}

const useDeleteServer = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return serverService.destroy(serverId as string, token as string)
    },
    onSuccess: () => {
      const servers = queryClient.getQueryData(["servers"]) as Server[]
      queryClient.setQueryData(
        ["servers"],
        servers.filter((s) => s.id !== serverId),
      )
    },
  })
}

const useLeaveServer = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return serverService.leaveServer(serverId as string, token as string)
    },
    onSuccess: () => {
      const servers = queryClient.getQueryData(["servers"]) as Server[]
      queryClient.setQueryData(
        ["servers"],
        servers.filter((s) => s.id !== serverId),
      )
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
