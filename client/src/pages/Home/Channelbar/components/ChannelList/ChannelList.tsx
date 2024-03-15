import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { Channel } from "../../../../../../types.ts"
import channelService from "../../../../../services/channelService.ts"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { useQuery } from "@tanstack/react-query"

const Wrapper = styled.div`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
  flex: 1 1 auto;
`

const ChannelList = () => {
  const { token } = useContext(AuthContext)
  const { serverId } = useParams()

  const result = useQuery({
    queryKey: [`${serverId}-channels`],
    queryFn: () => channelService.get(token as string, serverId as string),
  })

  if (result.isLoading) {
    return <ChannelListCategory title="" />
  }

  const channels: Channel[] = result.data.channels

  return (
    <Wrapper>
      <ChannelListCategory title={"General"} />
      {channels?.map((channel) => {
        return <ChannelListItem key={channel.id} channel={channel} />
      })}
    </Wrapper>
  )
}

export default ChannelList
