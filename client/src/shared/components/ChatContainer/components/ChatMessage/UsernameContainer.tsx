import { useState } from "react"
import PopoutContainer from "../../../PopoutContainer.tsx"
import UserInfoPopout from "../../../user/UserInfoPopout.tsx"
import { User } from "../../../../../../types.ts"
import styled from "styled-components"

const Username = styled.div<{ $color?: string | null }>`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => (props.$color ? props.$color : "rgb(242, 243, 245)")};
  display: inline;

  &:hover {
    text-decoration: underline;
  }
`

const UsernameContainer = ({ user, color }: { user: User; color?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PopoutContainer
      popout={
        <UserInfoPopout user={user} setIsOpen={setIsOpen} position="right" />
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position="right"
      style={{ display: "inline" }}
    >
      <Username $color={color ? color : null}>{user.username}</Username>
    </PopoutContainer>
  )
}

export default UsernameContainer
