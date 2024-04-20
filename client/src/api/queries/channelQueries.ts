import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import channelService from "../services/channelService.ts"
import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"
import { Channel } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useLocation, useNavigate } from "react-router-dom"

const useGetChannels = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useQuery({
    queryKey: ["channels", `${serverId}`],
    queryFn: async () => {
      const channels = await channelService.get(
        token as string,
        serverId as string,
      )

      if (channels.length === 0) return []

      const channel: Channel = channels[0]
      if (!pathname.match(new RegExp(`.*/${channel.serverId}/.*`))) {
        navigate(`/channels/${channel.serverId}/${channel.id}`)
      }

      return channels
    },
  })
}

const useCreateChannel = (serverId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (newChannel: { name: string }) => {
      return channelService.create(
        token as string,
        serverId as string,
        newChannel,
      )
    },
    onSuccess: (newChannel) => {
      const oldChannels = queryClient.getQueryData([
        "channels",
        `${serverId}`,
      ]) as Channel[]
      const newChannels = oldChannels.concat(newChannel)
      queryClient.setQueryData(["channels", `${serverId}`], newChannels)

      socket.emit("channel:create", newChannel)
      navigate(`/channels/${newChannel.serverId}/${newChannel.id}`)
    },
  })
}

const useEditChannel = (
  serverId: string | undefined,
  channelId: string | undefined,
) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (channelToEdit: { name: string }) => {
      return channelService.update(
        token as string,
        serverId as string,
        channelId as string,
        channelToEdit,
      )
    },
    onSuccess: (editedChannel: Channel) => {
      const oldChannels = queryClient.getQueryData([
        "channels",
        `${serverId}`,
      ]) as Channel[]
      const newChannels = oldChannels.map((c) =>
        c.id === editedChannel.id ? editedChannel : c,
      )
      queryClient.setQueryData(["channels", `${serverId}`], newChannels)

      socket.emit("channel:edit", editedChannel, serverId)
    },
  })
}

const useDeleteChannel = (
  serverId: string | undefined,
  channelId: string | undefined,
) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useMutation({
    mutationFn: () => {
      return channelService.destroy(
        token as string,
        serverId as string,
        channelId as string,
      )
    },
    onSuccess: () => {
      const oldChannels = queryClient.getQueryData([
        "channels",
        `${serverId}`,
      ]) as Channel[]
      const newChannels = oldChannels.filter((c) => c.id !== channelId)
      queryClient.setQueryData(["channels", `${serverId}`], newChannels)

      socket.emit("channel:delete", { channelId, serverId })

      // redirect back to server home page if no channels left after delete
      if (newChannels.length === 0) {
        navigate(`/channels/${serverId}`)
      }

      if (pathname.match(new RegExp(channelId as string))) {
        navigate(`/channels/${serverId}/${newChannels[0].id}`)
      }
    },
  })
}

const channelQueries = {
  useGetChannels,
  useCreateChannel,
  useEditChannel,
  useDeleteChannel,
}

export default channelQueries
