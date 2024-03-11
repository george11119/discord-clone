import styled from "styled-components"
import Header from "./components/Header.tsx"
import ChannelList from "./components/ChannelList/ChannelList.tsx"
import UserBar from "./components/UserInfo/UserBar.tsx"
import { matchPath, useLocation } from "react-router-dom"
import ConversationSearchButton from "./components/ConversationSearchButton.tsx"
import DirectMessagesList from "./components/DirectMessagesList/DirectMessagesList.tsx"

const Wrapper = styled.nav`
  width: 240px;
  height: 100vh;
  background-color: rgb(43, 45, 49);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`

const ChannelTitle = styled.h1`
  margin-left: 6px;
`

const Channelbar = () => {
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)

  return (
    <Wrapper>
      <Header>
        {isHomeLink ? (
          <ConversationSearchButton />
        ) : (
          <ChannelTitle>Hello</ChannelTitle>
        )}
      </Header>
      {isHomeLink ? <DirectMessagesList /> : <ChannelList />}
      <UserBar />
    </Wrapper>
  )
}

export default Channelbar
