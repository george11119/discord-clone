import styled from "styled-components"
import HomepageContainerHeader from "./components/Header/HomepageContainerHeader.tsx"
import { useState } from "react"

const Wrapper = styled.div`
  background-color: rgb(49, 51, 56);
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-grow: 1;
`

const ChatContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const FriendsDisplayContainer = () => {
  const [display, setDisplay] = useState("online")
  return (
    <Wrapper>
      <HomepageContainerHeader display={display} setDisplay={setDisplay} />
      <MainContainer>
        <ChatContent>
          <div>{display}</div>
        </ChatContent>
      </MainContainer>
    </Wrapper>
  )
}

export default FriendsDisplayContainer
