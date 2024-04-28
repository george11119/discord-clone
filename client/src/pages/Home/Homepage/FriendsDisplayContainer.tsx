import styled from "styled-components"
import HomepageContainerHeader from "./components/Header/HomepageContainerHeader.tsx"
import { useState } from "react"
import RelationshipsList from "./components/RelationshipsList/RelationshipsList.tsx"
import UserActivityList from "./components/UserActvityList/UserActivityList.tsx"
import { FriendRequestItem, User } from "../../../../types.ts"
import AddFriendPage from "./components/AddFriendPage/AddFriendPage.tsx"
import userSocketHandlers from "../../../api/sockets/userSocketHandlers.ts"

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
  display: flex;
  flex-grow: 1;
  //flex-direction: column;
`

export type FriendsDisplayTypes =
  | "online"
  | "all"
  | "pending"
  | "blocked"
  | "addFriend"

const FriendsDisplayContainer = ({
  friends,
  friendRequests,
}: {
  friends: User[]
  friendRequests: FriendRequestItem[]
}) => {
  const [display, setDisplay] = useState<FriendsDisplayTypes>("online")

  userSocketHandlers.useFriendRequestReceivedListener()
  userSocketHandlers.useDestroyFriendRequestListener()
  userSocketHandlers.useFriendRequestAcceptedListener()
  userSocketHandlers.useDestroyFriendshipListener()

  return (
    <Wrapper>
      <HomepageContainerHeader display={display} setDisplay={setDisplay} />
      <MainContainer>
        <FriendsListContainer>
          {display === "addFriend" ? (
            <AddFriendPage />
          ) : (
            <RelationshipsList
              display={display}
              friends={friends}
              friendRequests={friendRequests}
            />
          )}
          <UserActivityList />
        </FriendsListContainer>
      </MainContainer>
    </Wrapper>
  )
}

export default FriendsDisplayContainer
