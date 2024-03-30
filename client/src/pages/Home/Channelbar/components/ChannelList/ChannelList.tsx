import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"
import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { Channel } from "../../../../../../types.ts"
import channelService from "../../../../../services/channelService.ts"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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

  if (result.isLoading) {
    return <ChannelListCategory title="" />
  }

  const channels: Channel[] = result.data.channels

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
