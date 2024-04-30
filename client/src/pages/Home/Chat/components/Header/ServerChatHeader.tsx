import styled from "styled-components"
import Hashtag from "../../../../../shared/svg/Hashtag.tsx"
import HeaderButtons from "./HeaderButtons.tsx"
import Header from "../../../../../shared/components/Header/Header.tsx"

const Left = styled.div`
  padding-left: 8px;
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const ServerChatHeader = ({
  chatTitle,
  userList,
}: {
  chatTitle: string
  userList: {
    userListShown: boolean
    setUserListShown: (x: boolean) => void
  }
}) => {
  return (
    <Header>
      <Left>
        <Hashtag size={24} color="#80848e" />
        <h1>{chatTitle}</h1>
      </Left>
      <Right>
        <HeaderButtons userList={userList} />
      </Right>
    </Header>
  )
}

export default ServerChatHeader
