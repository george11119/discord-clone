import styled from "styled-components"
import HomepageContainerHeader from "./components/Header/HomepageContainerHeader.tsx"
import { useState } from "react"
import FriendsList from "./components/FriendsList/FriendsList.tsx"
import UserActivityList from "./components/UserActvityList/UserActivityList.tsx"

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

const FriendsListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 364px;
  flex-grow: 1;
  //flex-direction: column;
`

const FriendsDisplayContainer = () => {
  const [display, setDisplay] = useState("online")
  return (
    <Wrapper>
      <HomepageContainerHeader display={display} setDisplay={setDisplay} />
      <MainContainer>
        <FriendsListContainer>
          <FriendsList display={display} />
          <UserActivityList />
        </FriendsListContainer>
      </MainContainer>
    </Wrapper>
  )
}

export default FriendsDisplayContainer
