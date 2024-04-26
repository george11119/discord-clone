import Header from "../../../../../shared/components/Container/Header.tsx"
import InboxIcon from "../../../../../shared/svg/InboxIcon.tsx"
import HelpIcon from "../../../../../shared/svg/HelpIcon.tsx"
import IconButton from "../../../../../shared/components/IconButton.tsx"
import styled from "styled-components"

const Left = styled.div`
  padding-left: 8px;
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const HomepageContainerHeader = () => {
  return (
    <Header>
      <Left>sfd</Left>
      <Right>
        {/*inbox button*/}
        <IconButton>
          <InboxIcon size={24} />
        </IconButton>

        {/*Help button*/}
        <IconButton>
          <HelpIcon size={24} />
        </IconButton>
      </Right>
    </Header>
  )
}

export default HomepageContainerHeader
