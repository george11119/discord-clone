import styled from "styled-components"
import Header from "./Header.tsx"
import ChannelList from "./ChannelList.tsx"

const Wrapper = styled.nav`
  width: 240px;
  height: 100vh;
  background-color: rgb(43, 45, 49);
  flex-shrink: 0;
`

const Channelbar = () => {
  return (
    <Wrapper>
      <Header title={"Channel title"} />
      <ChannelList />
    </Wrapper>
  )
}

export default Channelbar
