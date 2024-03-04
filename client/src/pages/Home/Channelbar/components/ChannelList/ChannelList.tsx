import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Channel } from "../../../../../../types.ts"
import channelService from "../../../../../services/channelService.ts"

const Wrapper = styled.ul`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
  flex: 1 1 auto;
`

const ChannelList = () => {
  const [channels, setChannels] = useState<Channel[]>([])
  const { serverId } = useParams()

  useEffect(() => {
    if (!serverId) {
      setChannels([])
      return
    }

    channelService.get(serverId).then((data) => setChannels(data.channels))
  }, [serverId])

  return (
    <Wrapper>
      <ChannelListCategory title={"General"} />
      {channels.map((channel) => {
        return <ChannelListItem key={channel.id} name={channel.name} />
      })}
    </Wrapper>
  )
}

export default ChannelList
