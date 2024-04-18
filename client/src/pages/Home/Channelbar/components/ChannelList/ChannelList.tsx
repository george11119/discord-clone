import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"
import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { Channel } from "../../../../../../types.ts"
import channelService from "../../../../../api/services/channelService.ts"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { socket } from "../../../../../config/socket.ts"

const Wrapper = styled.div`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
  flex: 1 1 auto;
`

const ChannelList = () => {
  const { token } = useContext(AuthContext)
  const { serverId } = useParams()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ["channels"],
    queryFn: () => channelService.get(token as string, serverId as string),
  })

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["channels"],
    })
  }, [serverId])

  useEffect(() => {
    const onChannelCreate = (newChannel: Channel) => {
      const oldChannels = queryClient.getQueryData(["channels"]) as Channel[]
      const newChannels = oldChannels.concat(newChannel)
      queryClient.setQueryData(["channels"], newChannels)
    }

    socket.on("channel:create", onChannelCreate)

    return () => {
      socket.off("channel:create", onChannelCreate)
    }
  }, [])

  useEffect(() => {
    const onChannelEdit = (editedChannel: Channel) => {
      const oldChannels = queryClient.getQueryData(["channels"]) as Channel[]
      const newChannels = oldChannels.map((c) =>
        c.id === editedChannel.id ? editedChannel : c,
      )
      queryClient.setQueryData(["channels"], newChannels)
    }

    socket.on("channel:edit", onChannelEdit)

    return () => {
      socket.off("channel:edit", onChannelEdit)
    }
  }, [])

  useEffect(() => {
    const onChannelDelete = (channelId: string) => {
      const oldChannels = queryClient.getQueryData(["channels"]) as Channel[]
      const newChannels = oldChannels.filter((c) => c.id !== channelId)
      queryClient.setQueryData(["channels"], newChannels)
    }

    socket.on("channel:delete", onChannelDelete)

    return () => {
      socket.off("channel:delete", onChannelDelete)
    }
  }, [])

  if (result.isLoading) {
    return <ChannelListCategory title="" />
  }

  const channels: Channel[] = result.data

  return (
    <Wrapper>
      <ChannelListCategory title={"General"}>
        {channels?.map((channel) => {
          return <ChannelListItem key={channel.id} channel={channel} />
        })}
      </ChannelListCategory>
    </Wrapper>
  )
}

export default ChannelList
