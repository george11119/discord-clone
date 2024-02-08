import styled from "styled-components"
import ChannelBarHeader from "./ChannelbarHeader.tsx"
import ChannelList from "./ChannelList.tsx"

const ChannelbarWrapper = styled.nav`
  width: 240px;
  height: 100vh;
  background-color: rgb(43, 45, 49);
`

const Channelbar = () => {
  return (
    <ChannelbarWrapper>
      <ChannelBarHeader title={"Channel title"} />
      <ChannelList />
    </ChannelbarWrapper>
  )
}

export default Channelbar
