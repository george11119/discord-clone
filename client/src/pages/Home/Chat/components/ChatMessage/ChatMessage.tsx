import styled from "styled-components"
import { useState } from "react"
import { Message } from "../../../../../../types.ts"
import {
  dateFormatter,
  messageDateFormatter,
} from "../../../../../utils/dateTime.ts"
import MessageOptionsPopout from "./MessageOptionsPopout.tsx"
import EditMessageForm from "./EditMessageForm.tsx"
import ChatMessageProfilePicture from "./ChatMessageProfilePicture.tsx"
import UsernameContainer from "./UsernameContainer.tsx"

const Wrapper = styled.li<{ $beingEdited: boolean }>`
  margin-left: 16px;
  margin-top: 16px;
  display: flex;
  line-height: 1.375rem;
  background-color: ${(props) =>
    props.$beingEdited ? "rgba(2, 2, 2, 0.06)" : "inherit"};

  &:hover {
    background-color: rgba(2, 2, 2, 0.06);
  }
`

const MessageWrapper = styled.div`
  margin-left: 16px;
  position: relative;
  width: 100%;
  white-space: initial;
`

const DateWrapper = styled.span`
  margin-left: 8px;
  color: rgb(148, 155, 164);
  font-size: 12px;
`

const Timestamp = styled.div`
  min-width: 72px;
  max-width: 72px;
  display: flex;
  justify-content: center;
  font-size: 11px;
  color: rgb(148, 155, 164);
`

const MessageContentWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding-right: 48px;
  word-break: break-word;
`

const EditedIndicator = styled.span`
  font-size: 10px;
  color: rgb(148, 155, 164);
  user-select: none;
`

const ChatMessage = ({
  message,
  withProfilePicture = true,
}: {
  message: Message
  withProfilePicture?: boolean
}) => {
  const [beingEdited, setBeingEdited] = useState(false)
  const [hovered, setHovered] = useState(false)

  const edited = message.createdAt !== message.updatedAt

  if (!withProfilePicture) {
    return (
      <Wrapper
        style={{ marginTop: 0, marginLeft: 0 }}
        $beingEdited={beingEdited}
        onMouseOver={() => {
          if (!beingEdited) setHovered(true)
        }}
        onMouseOut={() => {
          if (!beingEdited) setHovered(false)
        }}
      >
        <Timestamp>
          {hovered && dateFormatter(message.createdAt, "h:mm a")}
        </Timestamp>
        <MessageWrapper style={{ marginLeft: 0 }}>
          {beingEdited ? (
            <EditMessageForm
              message={message}
              setBeingEdited={setBeingEdited}
            />
          ) : (
            <MessageContentWrapper>
              {message.content}{" "}
              {edited ? <EditedIndicator>(edited)</EditedIndicator> : ""}
            </MessageContentWrapper>
          )}
          {hovered && (
            <MessageOptionsPopout
              messageId={message.id}
              setBeingEditted={setBeingEdited}
            />
          )}
        </MessageWrapper>
      </Wrapper>
    )
  }

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
      <ChatMessageProfilePicture user={message.user} />
      <MessageWrapper>
        <UsernameContainer user={message.user} />
        <DateWrapper>{messageDateFormatter(message.createdAt)}</DateWrapper>
        {beingEdited ? (
          <EditMessageForm message={message} setBeingEdited={setBeingEdited} />
        ) : (
          <MessageContentWrapper>
            {message.content}{" "}
            {edited ? <EditedIndicator>(edited)</EditedIndicator> : ""}
          </MessageContentWrapper>
        )}
        {hovered && (
          <MessageOptionsPopout
            messageId={message.id}
            setBeingEditted={setBeingEdited}
          />
        )}
      </MessageWrapper>
    </Wrapper>
  )
}

export default ChatMessage
