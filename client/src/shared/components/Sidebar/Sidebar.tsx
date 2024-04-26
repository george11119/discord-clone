import styled from "styled-components"
import { ReactNode } from "react"

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
    <Wrapper>
      {header}
      <ScrollableContainer>{children}</ScrollableContainer>
    </Wrapper>
  )
}

export default Sidebar
