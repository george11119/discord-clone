import { Message } from "../../../../../../types.ts"
import styled from "styled-components"
import UserJoinIcon from "../../../../../shared/svg/UserJoinIcon.tsx"
import { messageDateFormatter } from "../../../../../utils/dateTime.ts"
import UsernameContainer from "./UsernameContainer.tsx"
import { useState } from "react"
import MessageOptionsPopout from "./MessageOptionsPopout.tsx"
import { stringToNum } from "../../../../../utils/stringToNum.ts"

const Wrapper = styled.li`
  margin-top: 16px;
  display: flex;
  line-height: 1.375rem;
  background-color: inherit;
  position: relative;

  &:hover {
    background-color: rgba(2, 2, 2, 0.06);
  }
`

const UserJoinIconContainer = styled.div`
  width: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4px;
`

const WelcomeMessageContainer = styled.div`
  color: rgb(148, 155, 164);
  font-size: 15px;
`

const DateWrapper = styled.span`
  margin-left: 8px;
  color: rgb(148, 155, 164);
  font-size: 12px;
`

const welcomeMessageGenerator = (message: Message) => {
  const randomNum = stringToNum(message.id) % 6

  if (randomNum === 0) {
    return (
      <>
        <UsernameContainer user={message.user} /> just slid into the server!
      </>
    )
  } else if (randomNum === 1) {
    return (
      <>
        <UsernameContainer user={message.user} /> just landed.
      </>
    )
  } else if (randomNum === 2) {
    return (
      <>
        Welcome <UsernameContainer user={message.user} />. Say hi!
      </>
    )
  } else if (randomNum === 3) {
    return (
      <>
        A wild <UsernameContainer user={message.user} /> appeared.
      </>
    )
  } else if (randomNum === 4) {
    return (
      <>
        Glad you're here, <UsernameContainer user={message.user} />.
      </>
    )
  } else if (randomNum === 5) {
    return (
      <>
        Welcome, <UsernameContainer user={message.user} />
        .We hope you brought pizza.
      </>
    )
  }
}

const WelcomeMessage = ({ message }: { message: Message }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <Wrapper
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <UserJoinIconContainer>
          <UserJoinIcon size={18} />
        </UserJoinIconContainer>
        <WelcomeMessageContainer>
          {welcomeMessageGenerator(message)}
          <DateWrapper>{messageDateFormatter(message.createdAt)}</DateWrapper>
        </WelcomeMessageContainer>
        {hovered && (
          <MessageOptionsPopout messageId={message.id} canEdit={false} />
        )}
      </Wrapper>
    </>
  )
}

export default WelcomeMessage
