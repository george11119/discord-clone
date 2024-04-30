import Header from "../../../../../shared/components/Header/Header.tsx"
import styled from "styled-components"
import UserProfilePicture from "../../../../../shared/components/UserProfilePicture.tsx"
import { User } from "../../../../../../types.ts"
import HorizontalSpacer from "../../../../../shared/components/HorizontalSpacer.tsx"
import HeaderButtons from "./HeaderButtons.tsx"

const Left = styled.div`
  padding-left: 8px;
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const DirectMessageChatHeader = ({
  recepient,
  profilePanel,
}: {
  recepient: User | undefined
  profilePanel: {
    profilePanelShown: boolean
    setProfilePanelShown: (x: boolean) => void
  }
}) => {
  return (
    <Header>
      <Left>
        <UserProfilePicture profileDiameter={24} user={recepient as User} />
        <HorizontalSpacer width={12} />
        <h1>{recepient?.username}</h1>
      </Left>
      <Right>
        <HeaderButtons profilePanel={profilePanel} />
      </Right>
    </Header>
  )
}

export default DirectMessageChatHeader
