import styled from "styled-components"
import { FormEvent, useContext, useEffect, useState } from "react"
import UploadFileButton from "../../../../shared/svg/UploadFileButton.tsx"
import messageService from "../../../../services/messageService.ts"
import AuthContext from "../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Message } from "../../../../../types.ts"
import { socket } from "../../../../config/socket.ts"

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
  const { token } = useContext(AuthContext)
  const { channelId } = useParams()
  const [content, setContent] = useState("")
  const queryClient = useQueryClient()

  const newMessageMutation = useMutation({
    mutationFn: (newMessage: { content: string }) => {
      const res = messageService.create(
        token as string,
        newMessage,
        channelId as string,
      )
      return res
    },
    onSuccess: (newMessage) => {
      const messages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      queryClient.setQueryData(
        [`messages-${channelId}`],
        messages?.concat(newMessage),
      )

      socket.emit("message:create", newMessage)
    },
  })

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
