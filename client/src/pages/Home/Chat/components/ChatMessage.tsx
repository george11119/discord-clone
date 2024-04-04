import styled from "styled-components"
import { useState } from "react"
import { Message } from "../../../../../types.ts"
import { formatDateTime } from "../../../../utils/dateTime.ts"
import TrashIcon from "../../../../shared/svg/TrashIcon.tsx"
import EditIcon from "../../../../shared/svg/EditIcon.tsx"

const Wrapper = styled.li`
  margin-left: 16px;
  margin-top: 16px;
  display: flex;
  line-height: 1.375rem;
  position: relative;

  &:hover {
    background-color: rgba(2, 2, 2, 0.06);
  }
`

const Img = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 16px;
  margin-top: 2px;
  background-color: yellow;
`

const DateWrapper = styled.span`
  margin-left: 8px;
  color: rgb(148, 155, 164);
  font-size: 12px;
`

const MessageWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
`

const Sender = styled.span`
  font-size: 14px;
  font-weight: 600;
`

const ChatMessage = ({ message }: { message: Message }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Wrapper
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Img></Img>
      <div>
        <Sender>{message.user.username}</Sender>
        <DateWrapper>{formatDateTime(message.createdAt)}</DateWrapper>
        <MessageWrapper>{message.content}</MessageWrapper>
      </div>
      {hovered && <MessageOptionsPopout />}
    </Wrapper>
  )
}

const PopoutWrapper = styled.div`
  position: absolute;
  top: -16px;
  right: 0;
  margin-right: 14px;
  margin-left: 32px;
  height: 32px;
  background-color: rgb(49, 51, 56);
  box-shadow: rgba(2, 2, 2, 0.15) 0px 0px 0px 1px;
  display: flex;
  border-radius: 4px;
`

const IconWrapper = styled.div<{ $type?: string }>`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) =>
      props.$type === "delete" ? "#f23f42" : "rgba(78, 80, 88, 0.3)"};
  }
`

// TODO add tooltips to icon wrappers
const MessageOptionsPopout = () => {
  return (
    <PopoutWrapper>
      <IconWrapper $type="delete" onClick={() => console.log("deleted")}>
        <TrashIcon size={20} />
      </IconWrapper>

      <IconWrapper onClick={() => console.log("edited")}>
        <EditIcon size={20} />
      </IconWrapper>
    </PopoutWrapper>
  )
}

export default ChatMessage
