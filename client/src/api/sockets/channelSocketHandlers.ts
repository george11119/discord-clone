import { useEffect } from "react"
import { Channel } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useLocation, useNavigate } from "react-router-dom"
import useChannelStore from "../stores/channelStore.ts"

const useChannelCreateListener = () => {
  const channelStore = useChannelStore()

  return useEffect(() => {
    const onChannelCreate = (newChannel: Channel) => {
      channelStore.addOne(newChannel)
    }

    socket.on("channel:create", onChannelCreate)

    return () => {
      socket.off("channel:create", onChannelCreate)
    }
  }, [])
}

const useChannelEditListener = () => {
  const channelStore = useChannelStore()

  return useEffect(() => {
    const onChannelEdit = (editedChannel: Channel) => {
      channelStore.updateOne(editedChannel)
    }

    socket.on("channel:edit", onChannelEdit)

    return () => {
      socket.off("channel:edit", onChannelEdit)
    }
  }, [])
}

const useChannelDeleteListener = () => {
  const channelStore = useChannelStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useEffect(() => {
    const onChannelDelete = (channelId: string, serverId: string) => {
      const newChannels = channelStore.deleteOne(channelId, serverId)

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
