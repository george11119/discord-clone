import DiscordIcon from "../../../../../pages/Auth/assets/DiscordIcon.tsx"
import { User } from "../../../../../../types.ts"
import styled from "styled-components"
import { stringToColor } from "../../../../../utils/stringToColor.ts"
import PopoutContainer from "../../../PopoutContainer.tsx"
import { useState } from "react"
import UserInfoPopout from "../../../user/UserInfoPopout.tsx"
import useModal from "../../../../../hooks/useModal.ts"
import useContextMenu from "../../../../../hooks/useContextMenu.ts"
import UserContextMenuContainer from "../../../user/UserContextMenuContainer.tsx"

const Img = styled.div<{ $backgroundColor: string }>`
  min-height: 40px;
  max-height: 40px;
  min-width: 40px;
  max-width: 40px;
  border-radius: 50%;
  margin-top: 2px;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "#5865f2"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`

const ChatMessageProfilePicture = ({ user }: { user: User }) => {
  const contextMenu = useContextMenu()
  const modal = useModal()
  const color = stringToColor(user.username)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <PopoutContainer
        popout={
          <UserInfoPopout user={user} setIsOpen={setIsOpen} position="right" />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        position="right"
      >
        <Img
          $backgroundColor={color}
          onContextMenu={(e) => contextMenu.open(e)}
        >
          <DiscordIcon size={24} />
        </Img>
      </PopoutContainer>
      <UserContextMenuContainer
        contextMenu={contextMenu}
        user={user}
        modal={modal}
      />
    </>
  )
}

export default ChatMessageProfilePicture
