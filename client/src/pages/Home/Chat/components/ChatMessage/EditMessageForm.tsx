import styled from "styled-components"
import { Message } from "../../../../../../types.ts"
import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAutosizeTextArea from "../../../../../hooks/useAutosizeTextArea.ts"
import messageService from "../../../../../services/messageService.ts"

const EditMessageFormWrapper = styled.form``

const EditInputTextArea = styled.textarea`
  border-radius: 8px;
  background-color: #383a40;
  color: rgb(219, 222, 225);
  outline: none;
  border: none;
  overflow: hidden;
  resize: none;
  padding: 13px;
  min-width: calc(100% - 48px);
  max-width: calc(100% - 48px);
  box-sizing: border-box;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`

const EditButtonContainer = styled.div`
  font-size: 11px;
  padding-bottom: 7px;
`

const EditButton = styled.button`
  background: none;
  color: rgb(0, 168, 252);
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    text-decoration: underline;
  }
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

  const [content, setContent] = useState(message.content) // content for the edited message
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  useAutosizeTextArea(textAreaRef.current, content)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px"
      const scrollHeight = textAreaRef.current.scrollHeight

      textAreaRef.current.style.height = scrollHeight + "px"
      textAreaRef.current.setSelectionRange(content.length, content.length)
      textAreaRef.current.focus()
    }
  }, [])

  const editMessageMutation = useMutation({
    mutationFn: (editedMessage: { content: string }) => {
      return messageService.update(
        token as string,
        editedMessage,
        channelId as string,
        message.id
      )
    },
    onSuccess: (editedMessage) => {
      const messages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      queryClient.setQueryData(
        [`messages-${channelId}`],
        messages.map((m) => (m.id === editedMessage.id ? editedMessage : m))
      )

      setBeingEdited(false)
    },
  })

  const onEnterPress = (e: any) => {
    if (submitButtonRef.current && e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault()
      submitButtonRef.current.click()
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (content === message.content || content === "") {
      setBeingEdited(false)
      return
    }

    const messageObject = { content }
    editMessageMutation.mutate(messageObject)
  }

  return (
    <EditMessageFormWrapper onSubmit={onSubmit}>
      <EditInputTextArea
        value={content}
        ref={textAreaRef}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={onEnterPress}
      />
      <EditButtonContainer>
        <span>press to </span>
        <EditButton onClick={() => setBeingEdited(false)}>cancel</EditButton>
        <span> • enter to </span>
        <EditButton ref={submitButtonRef}>save</EditButton>
      </EditButtonContainer>
    </EditMessageFormWrapper>
  )
}

export default EditMessageForm
