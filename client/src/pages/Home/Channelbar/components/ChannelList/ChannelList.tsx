import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"
import { useParams } from "react-router-dom"
import { Channel } from "../../../../../../types.ts"
import { useQuery, useQueryClient } from "@tanstack/react-query"
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

  const result = useQuery({
    queryKey: ["channels", `${serverId}`],
    queryFn: async () => {
      return queryClient.getQueryData(["channels", `${serverId}`]) as Channel[]
    },
  })

  channelSocketHandlers.useChannelCreateListener()
  channelSocketHandlers.useChannelEditListener()
  channelSocketHandlers.useChannelDeleteListener()

  if (result.isLoading) {
    return <ChannelListCategory title="" />
  }

  const channels: Channel[] = result.data!

  return (
    <Wrapper>
      <ChannelListCategory title={"Text Channels"}>
        {channels
          ?.filter((channel) => channel.channelType === "text")
          .map((channel) => {
            return <ChannelListItem key={channel.id} channel={channel} />
          })}
      </ChannelListCategory>
      {/*TODO add voice channels*/}
      <ChannelListCategory title={"Voice Channels"}></ChannelListCategory>
    </Wrapper>
  )
}

export default ChannelList
