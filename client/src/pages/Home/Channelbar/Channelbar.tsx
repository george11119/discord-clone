import styled from "styled-components"
import Header from "./components/Header.tsx"
import ChannelList from "./components/ChannelList.tsx"
import UserInfo from "./components/UserInfo.tsx"

const Wrapper = styled.nav`
  width: 240px;
  height: 100vh;
  background-color: rgb(43, 45, 49);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`

const Channelbar = () => {
  return (
    <Wrapper>
      <Header title={"Channel title"} />
      <ChannelList />
      <UserInfo />
    </Wrapper>
  )
}

export default Channelbar
