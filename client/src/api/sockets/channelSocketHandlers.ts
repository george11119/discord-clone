import { useEffect } from "react"
import { Channel } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"

const useChannelCreateListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onChannelCreate = (newChannel: Channel) => {
      const oldChannels = queryClient.getQueryData([
        "channels",
        `${newChannel.serverId}`,
      ]) as Channel[]
      const newChannels = oldChannels.concat(newChannel)
      queryClient.setQueryData(
        ["channels", `${newChannel.serverId}`],
        newChannels,
      )
    }

    socket.on("channel:create", onChannelCreate)

    return () => {
      socket.off("channel:create", onChannelCreate)
    }
  }, [])
}

const useChannelEditListener = () => {
  const queryClient = useQueryClient()

  return useEffect(() => {
    const onChannelEdit = (editedChannel: Channel) => {
      const oldChannels = queryClient.getQueryData([
        "channels",
        `${editedChannel.serverId}`,
      ]) as Channel[]
      const newChannels = oldChannels.map((c) =>
        c.id === editedChannel.id ? editedChannel : c,
      )
      queryClient.setQueryData(
        ["channels", `${editedChannel.serverId}`],
        newChannels,
      )
    }

    socket.on("channel:edit", onChannelEdit)

    return () => {
      socket.off("channel:edit", onChannelEdit)
    }
  }, [])
}

const useChannelDeleteListener = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useEffect(() => {
    const onChannelDelete = (channelId: string, serverId: string) => {
      const oldChannels = queryClient.getQueryData([
        "channels",
        serverId,
      ]) as Channel[]
      const newChannels = oldChannels.filter((c) => c.id !== channelId)
      queryClient.setQueryData(["channels", serverId], newChannels)

      // redirect back to server home page if no channels left after delete
      if (newChannels.length === 0) {
        navigate(`/channels/${serverId}`)
      }

      if (pathname.match(new RegExp(channelId as string))) {
        navigate(`/channels/${serverId}/${newChannels[0].id}`)
      }
    }

    socket.on("channel:delete", onChannelDelete)

    return () => {
      socket.off("channel:delete", onChannelDelete)
    }
  }, [])
}

const channelSocketHandlers = {
  useChannelCreateListener,
  useChannelEditListener,
  useChannelDeleteListener,
}

export default channelSocketHandlers
