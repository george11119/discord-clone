import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Channel } from "../../../../../../types.ts"
import { useQueryClient } from "@tanstack/react-query"
import channelQueries from "../../../../../api/queries/channelQueries.ts"
import channelSocketHandlers from "../../../../../api/sockets/channelSocketHandlers.ts"

const Wrapper = styled.div`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
  flex: 1 1 auto;
`

const ChannelList = () => {
  const { serverId } = useParams()
  const queryClient = useQueryClient()

  const result = channelQueries.useGetChannels(serverId)

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["channels"],
    })
  }, [serverId])

  channelSocketHandlers.useChannelCreateListener()
  channelSocketHandlers.useChannelEditListener()
  channelSocketHandlers.useChannelDeleteListener()

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
