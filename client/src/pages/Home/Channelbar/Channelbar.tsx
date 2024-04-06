import styled from "styled-components"
import Header from "./components/Header/Header.tsx"
import ChannelList from "./components/ChannelList/ChannelList.tsx"
import UserBar from "./components/UserInfo/UserBar.tsx"
import { matchPath, useLocation } from "react-router-dom"
import DirectMessagesList from "./components/DirectMessagesList/DirectMessagesList.tsx"

const Wrapper = styled.nav`
  max-height: 100vh;
  background-color: rgb(43, 45, 49);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`

const ScrollableContainer = styled.div`
  overflow: hidden scroll;
  scrollbar-width: thin;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
`

const Channelbar = () => {
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)

  return (
    <Wrapper>
      <Header />
      <ScrollableContainer>
        {isHomeLink ? <DirectMessagesList /> : <ChannelList />}
      </ScrollableContainer>
      <UserBar />
    </Wrapper>
  )
}

export default Channelbar
