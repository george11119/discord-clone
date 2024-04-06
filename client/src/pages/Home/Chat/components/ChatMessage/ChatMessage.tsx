import styled from "styled-components"
import { useState } from "react"
import { Message } from "../../../../../../types.ts"
import { formatDateTime } from "../../../../../utils/dateTime.ts"
import MessageOptionsPopout from "./MessageOptionsPopout.tsx"
import EditMessageForm from "./EditMessageForm.tsx"

const Wrapper = styled.li<{ $beingEdited: boolean }>`
  margin-left: 16px;
  margin-top: 16px;
  display: flex;
  line-height: 1.375rem;
  position: relative;
  background-color: ${(props) =>
    props.$beingEdited ? "rgba(2, 2, 2, 0.06)" : "inherit"};

  &:hover {
    background-color: rgba(2, 2, 2, 0.06);
  }
`

const MessageWrapper = styled.div`
  width: 100%;
  white-space: initial;
`

const Img = styled.div`
  min-height: 40px;
  max-height: 40px;
  min-width: 40px;
  max-width: 40px;
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

const MessageContentWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding-right: 48px;
  word-break: break-word;
`

const Sender = styled.span`
  font-size: 14px;
  font-weight: 600;
`

const EditedIndicator = styled.span`
  font-size: 10px;
  color: rgb(148, 155, 164);
  user-select: none;
`

const ChatMessage = ({ message }: { message: Message }) => {
  const [beingEdited, setBeingEdited] = useState(false)
  const [hovered, setHovered] = useState(false)

  const edited = message.createdAt !== message.updatedAt

  return (
    <Wrapper
      $beingEdited={beingEdited}
      onMouseOver={() => {
        if (!beingEdited) setHovered(true)
      }}
      onMouseOut={() => {
        if (!beingEdited) setHovered(false)
      }}
    >
      <Img></Img>
      <MessageWrapper>
        <Sender>{message.user.username}</Sender>
        <DateWrapper>{formatDateTime(message.createdAt)}</DateWrapper>
        {beingEdited ? (
          <EditMessageForm message={message} setBeingEdited={setBeingEdited} />
        ) : (
          <MessageContentWrapper>
            {message.content}{" "}
            {edited ? <EditedIndicator>(edited)</EditedIndicator> : ""}
          </MessageContentWrapper>
        )}
      </MessageWrapper>
      {hovered && (
        <MessageOptionsPopout
          messageId={message.id}
          setBeingEditted={setBeingEdited}
        />
      )}
    </Wrapper>
  )
}

export default ChatMessage
