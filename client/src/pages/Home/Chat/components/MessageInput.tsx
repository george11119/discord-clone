import styled from "styled-components"
import { FormEvent, useState } from "react"
import UploadFileButton from "../../../../shared/svg/UploadFileButton.tsx"
import { useParams } from "react-router-dom"
import messagesQueries from "../../../../api/queries/messagesQueries.ts"

const Wrapper = styled.form`
  height: 68px;
  margin: 0 16px;
`

const InputWrapper = styled.div`
  display: flex;
  background-color: rgb(56, 58, 64);
  align-items: center;
  border-radius: 8px;
  padding-right: 16px;
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  line-height: 22px;
  border-style: none;
  background-color: rgb(56, 58, 64);
  color: rgb(219, 222, 225);
  font-size: 16px;
  padding: 11px 0;
`

const UploadIconWrapper = styled.svg`
  padding: 0 16px;
  height: 24px;
  width: 26px;
  fill: none;
  cursor: pointer;
  color: hsl(215 calc(1 * 8.8%) 73.3% / 1);
`

const MessageInput = () => {
  const { channelId } = useParams()
  const [content, setContent] = useState("")

  const newMessageMutation = messagesQueries.useCreateMessage(channelId)

  const sendMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (content === "") return

    const messageObject = { content }
    newMessageMutation.mutate(messageObject)
    setContent("")
  }

  return (
    <Wrapper onSubmit={sendMessage}>
      <InputWrapper>
        <UploadIconWrapper>
          <UploadFileButton size={24} />
        </UploadIconWrapper>
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a message"
        />
      </InputWrapper>
      <input type="submit" hidden />
    </Wrapper>
  )
}

export default MessageInput
