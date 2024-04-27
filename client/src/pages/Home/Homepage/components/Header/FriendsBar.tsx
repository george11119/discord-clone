import Friends from "../../../../../shared/svg/Friends.tsx"
import styled from "styled-components"
import { CSSProperties } from "react"

const H1 = styled.h1`
  color: rgb(242, 243, 245);
  margin-right: 8px;
  font-size: 14px;
`

const IconContainer = styled.div`
  color: rgb(128, 132, 142);
  margin: 0 8px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Divider = styled.div`
  width: 1px;
  height: 24px;
  margin: 0 8px;
  flex: 0 0 auto;
  background: rgba(78, 80, 88, 0.4);
`

const FriendsBarButton = styled.div`
  margin: 0 8px;
  padding: 2px 8px;
  height: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  color: rgb(181, 186, 193);
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #393c41;
    color: rgb(219, 222, 225);
  }
`

const AddFriendButton = styled.div`
  margin: 0 8px;
  padding: 2px 8px;
  height: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  background-color: rgb(36, 128, 70);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  cursor: pointer;
  min-width: 77px;
`

const FriendsBar = ({
  display,
  setDisplay,
}: {
  display: string
  setDisplay: (x: string) => void
}) => {
  const activeStyle: CSSProperties = {
    color: "white",
    backgroundColor: "#43444b",
  }

  return (
    <Wrapper>
      <IconContainer>
        <Friends />
      </IconContainer>
      <H1>Friends</H1>
      <Divider />
      <FriendsBarButton
        style={display === "online" ? activeStyle : {}}
        onClick={() => setDisplay("online")}
      >
        Online
      </FriendsBarButton>
      <FriendsBarButton
        style={display === "all" ? activeStyle : {}}
        onClick={() => setDisplay("all")}
      >
        All
      </FriendsBarButton>
      <FriendsBarButton
        style={display === "pending" ? activeStyle : {}}
        onClick={() => setDisplay("pending")}
      >
        Pending
      </FriendsBarButton>
      <FriendsBarButton
        style={display === "blocked" ? activeStyle : {}}
        onClick={() => setDisplay("blocked")}
      >
        Blocked
      </FriendsBarButton>
      <AddFriendButton
        style={
          display === "addFriend"
            ? { backgroundColor: "inherit", color: "rgb(45, 199, 112)" }
            : {}
        }
        onClick={() => setDisplay("addFriend")}
      >
        Add Friend
      </AddFriendButton>
    </Wrapper>
  )
}

export default FriendsBar
