import Header from "../../../../../shared/components/Container/Header.tsx"
import InboxIcon from "../../../../../shared/svg/InboxIcon.tsx"
import HelpIcon from "../../../../../shared/svg/HelpIcon.tsx"
import IconButton from "../../../../../shared/components/IconButton.tsx"
import styled from "styled-components"
import FriendsBar from "./FriendsBar.tsx"
import NewGroupDMButton from "../../../../../shared/svg/NewGroupDMButton.tsx"
import { FriendsDisplayTypes } from "../../FriendsDisplayContainer.tsx"

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Right = styled.div`
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

const HomepageContainerHeader = ({
  display,
  setDisplay,
}: {
  display: FriendsDisplayTypes
  setDisplay: (x: FriendsDisplayTypes) => void
}) => {
  return (
    <Header>
      <Left>
        <FriendsBar display={display} setDisplay={setDisplay} />
      </Left>
      <Right>
        <IconButton>
          <NewGroupDMButton size={24} />
        </IconButton>

        <Divider />

        <IconButton>
          <InboxIcon size={24} />
        </IconButton>

        <IconButton>
          <HelpIcon size={24} />
        </IconButton>
      </Right>
    </Header>
  )
}

export default HomepageContainerHeader
