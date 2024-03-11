import styled from "styled-components"
import Header from "./components/Header.tsx"
import ChannelList from "./components/ChannelList/ChannelList.tsx"
import UserBar from "./components/UserInfo/UserBar.tsx"
import { matchPath, useLocation } from "react-router-dom"

const Wrapper = styled.nav`
  width: 240px;
  height: 100vh;
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
      <Header title={isHomeLink ? "Home" : "Channel title"} />
      {!isHomeLink && (
        <>
          <ChannelList />
        </>
      )}
      <UserBar />
    </Wrapper>
  )
}

export default Channelbar
