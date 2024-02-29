import styled from "styled-components"
import Header from "./components/Header.tsx"
import ChannelList from "./components/ChannelList/ChannelList.tsx"
import UserBar from "./components/UserInfo/UserBar.tsx"

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
      <UserBar />
    </Wrapper>
  )
}

export default Channelbar
