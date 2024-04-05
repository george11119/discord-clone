import styled from "styled-components"
import { FormEvent, useContext, useRef, useState } from "react"
import { Message } from "../../../../../types.ts"
import { formatDateTime } from "../../../../utils/dateTime.ts"
import TrashIcon from "../../../../shared/svg/TrashIcon.tsx"
import EditIcon from "../../../../shared/svg/EditIcon.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import messageService from "../../../../services/messageService.ts"
import AuthContext from "../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"
import useAutosizeTextArea from "../../../../hooks/useAutosizeTextArea.ts"

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

const MessageWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding-right: 48px;
`

const Sender = styled.span`
  font-size: 14px;
  font-weight: 600;
`

const ChatMessage = ({ message }: { message: Message }) => {
  const [beingEdited, setBeingEdited] = useState(false)
  const [hovered, setHovered] = useState(false)

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
      <div>
        <Sender>{message.user.username}</Sender>
        <DateWrapper>{formatDateTime(message.createdAt)}</DateWrapper>
        {beingEdited ? (
          <EditMessageForm message={message} setBeingEdited={setBeingEdited} />
        ) : (
          <MessageWrapper>{message.content}</MessageWrapper>
        )}
      </div>
      {hovered && (
        <MessageOptionsPopout
          messageId={message.id}
          setBeingEditted={setBeingEdited}
        />
      )}
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
const MessageOptionsPopout = ({
  messageId,
  setBeingEditted,
}: {
  messageId: string
  setBeingEditted: (beingEditted: boolean) => void
}) => {
  const { token } = useContext(AuthContext)
  const { channelId } = useParams()
  const queryClient = useQueryClient()

  const deleteMessageMutation = useMutation({
    mutationFn: () => {
      return messageService.destroy(
        token as string,
        channelId as string,
        messageId,
      )
    },
    onSuccess: () => {
      const messages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      queryClient.setQueryData(
        [`messages-${channelId}`],
        messages.filter((m) => m.id !== messageId),
      )
    },
  })

  return (
    <PopoutWrapper>
      <IconWrapper
        $type="delete"
        onClick={() => deleteMessageMutation.mutate()}
      >
        <TrashIcon size={20} />
      </IconWrapper>

      <IconWrapper onClick={() => setBeingEditted(true)}>
        <EditIcon size={20} />
      </IconWrapper>
    </PopoutWrapper>
  )
}

const EditMessageFormWrapper = styled.form``

const EditInput = styled.textarea`
  border-radius: 8px;
  background-color: #383a40;
  color: rgb(219, 222, 225);
  outline: none;
  border: none;
  overflow: hidden;
  resize: none;
  padding: 16px;
`

const EditMessageForm = ({
  message,
  setBeingEdited,
}: {
  message: Message
  setBeingEdited: (beingEdited: boolean) => void
}) => {
  const { token } = useContext(AuthContext)
  const { channelId } = useParams()
  const queryClient = useQueryClient()
  // content for the edited message
  const [content, setContent] = useState(message.content)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, content)

  const editMessageMutation = useMutation({
    mutationFn: (editedMessage: { content: string }) => {
      return messageService.update(
        token as string,
        editedMessage,
        channelId as string,
        message.id,
      )
    },
    onSuccess: (editedMessage) => {
      const messages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      queryClient.setQueryData(
        [`messages-${channelId}`],
        messages.map((m) => (m.id === editedMessage.id ? editedMessage : m)),
      )
    },
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    setBeingEdited(false)
  }

  return (
    <EditMessageFormWrapper onSubmit={onSubmit}>
      <EditInput
        value={content}
        ref={textAreaRef}
        onChange={(e) => setContent(e.target.value)}
        rows={1}
      />
    </EditMessageFormWrapper>
  )
}

export default ChatMessage
