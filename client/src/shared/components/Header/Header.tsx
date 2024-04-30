import styled from "styled-components"
import { ReactNode } from "react"

const Wrapper = styled.div`
  box-shadow:
    rgba(2, 2, 2, 0.2) 0px 1px 0px 0px,
    rgba(6, 6, 7, 0.05) 0px 1.5px 0px 0px,
    rgba(2, 2, 2, 0.05) 0px 2px 0px 0px;
  height: 32px;
  padding: 8px;
  min-height: 32px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  user-select: none;
  justify-content: space-between;
  z-index: 1;
`

const Header = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>
}

export default Header
