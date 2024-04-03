import styled from "styled-components"
import Header from "./components/Header/Header.tsx"
import ChannelList from "./components/ChannelList/ChannelList.tsx"
import UserBar from "./components/UserInfo/UserBar.tsx"
import { matchPath, useLocation } from "react-router-dom"
import DirectMessagesList from "./components/DirectMessagesList/DirectMessagesList.tsx"

// TODO fix channel list overflow
const Wrapper = styled.nav`
  width: 240px;
  max-height: 100vh;
  background-color: rgb(43, 45, 49);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`

const Channelbar = () => {
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)

  return (
    <Wrapper>
      <Header />
      {isHomeLink ? <DirectMessagesList /> : <ChannelList />}
      <UserBar />
    </Wrapper>
  )
}

export default Channelbar
