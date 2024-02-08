import styled from "styled-components"
import { FormEvent, useState } from "react"

const ChatFormWrapper = styled.form`
  height: 68px;
  padding: 0 16px;
`

const ChatForm = () => {
  const [message, setMessage] = useState("")

  const sendMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log(message)
    setMessage("")
  }

  return (
    <ChatFormWrapper onSubmit={sendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input type="submit" hidden />
    </ChatFormWrapper>
  )
}

export default ChatForm
