import DiscordIcon from "../../../../Auth/assets/DiscordIcon.tsx"
import { User } from "../../../../../../types.ts"
import styled from "styled-components"
import { stringToColor } from "../../../../../utils/stringToColor.ts"
import PopoutContainer from "../../../../../shared/components/PopoutContainer.tsx"
import { useState } from "react"

const PopoutWrapper = styled.div`
  height: 500px;
  width: 100px;
  background-color: red;
`

const Popout = () => {
  return <PopoutWrapper></PopoutWrapper>
}

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
  const color = stringToColor(user.username)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PopoutContainer
      popout={<Popout />}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position="right"
    >
      <Img $backgroundColor={color}>
        <DiscordIcon size={24} />
      </Img>
    </PopoutContainer>
  )
}

export default ChatMessageProfilePicture
