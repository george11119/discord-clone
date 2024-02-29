import styled from "styled-components"
import { ReactNode } from "react"

const Wrapper = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background-color: rgba(78, 80, 88, 0.6);
  }
`

const UserBarButton = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>
}

export default UserBarButton
