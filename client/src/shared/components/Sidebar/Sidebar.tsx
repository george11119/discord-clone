import styled from "styled-components"
import { ReactNode } from "react"
import VerticalSpacer from "../VerticalSpacer.tsx"
import UserBar from "../../../pages/Home/Channelbar/components/UserInfo/UserBar.tsx"

const Wrapper = styled.nav`
  max-height: 100vh;
  background-color: rgb(43, 45, 49);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`

const ScrollableContainer = styled.div`
  overflow: hidden scroll;
  scrollbar-width: thin;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
`

const Sidebar = ({
  header,
  children,
}: {
  header: ReactNode
  children: ReactNode
}) => {
  return (
    <Wrapper onContextMenu={(e) => e.preventDefault()}>
      {header}
      <VerticalSpacer height={8} />
      <ScrollableContainer>{children}</ScrollableContainer>
      <UserBar />
    </Wrapper>
  )
}

export default Sidebar
