import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"
import { useParams } from "react-router-dom"
import { Channel } from "../../../../../../types.ts"
import { useQuery } from "@tanstack/react-query"
import { ChannelType } from "../../../../../../../types.ts"
import useChannelStore from "../../../../../api/stores/channelStore.ts"

const Wrapper = styled.div`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
  flex: 1 1 auto;
`

const ChannelList = () => {
  const { serverId } = useParams()
  const channelStore = useChannelStore()

  const result = useQuery({
    queryKey: ["channels", `${serverId}`],
    queryFn: async () => {
      return channelStore.get(serverId as string)
    },
  })

  if (result.isLoading) {
    return <ChannelListCategory title="" />
  }

  const channels: Channel[] = result.data!

  return (
    <Wrapper>
      <ChannelListCategory title={"Text Channels"}>
        {channels
          .filter((channel) => channel.channelType === ChannelType.TEXT)
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
