import styled from "styled-components"
import { Message } from "../../../../../../types.ts"
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import useAutosizeTextArea from "../../../../../hooks/useAutosizeTextArea.ts"
import useOnKeyDown from "../../../../../hooks/useOnKeyDown.ts"
import { KeyCodes } from "../../../../../shared/constants/keycodes.ts"
import messagesQueries from "../../../../../api/queries/messagesQueries.ts"

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
  const { channelId } = useParams()

  const [content, setContent] = useState(message.content) // content for the edited message
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  useAutosizeTextArea(textAreaRef.current, content)

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px"
      const scrollHeight = textAreaRef.current.scrollHeight

      textAreaRef.current.style.height = scrollHeight + "px"
      textAreaRef.current.setSelectionRange(content.length, content.length)
      textAreaRef.current.focus()
    }
  }

  useEffect(() => {
    resizeTextArea()
  }, [])

  useLayoutEffect(() => {
    window.addEventListener("resize", resizeTextArea)
    return () => window.removeEventListener("resize", resizeTextArea)
  }, [])

  const editMessageMutation = messagesQueries.useEditMessage(channelId, message)

  const onEnterPress = (e: any) => {
    if (submitButtonRef.current && e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault()
      submitButtonRef.current.click()
    }
  }

  useOnKeyDown(KeyCodes.ESCAPE, () => setBeingEdited(false))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (content === message.content || content === "") {
      setBeingEdited(false)
      return
    }

    const messageObject = { content }

    editMessageMutation.mutate(messageObject)
    setBeingEdited(false)
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
        <span>Escape to </span>
        <EditButton onClick={() => setBeingEdited(false)}>cancel</EditButton>
        <span> • enter to </span>
        <EditButton ref={submitButtonRef}>save</EditButton>
      </EditButtonContainer>
    </EditMessageFormWrapper>
  )
}

export default EditMessageForm
