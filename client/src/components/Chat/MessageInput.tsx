import styled from "styled-components"
import { FormEvent, useState } from "react"

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

const Svg = styled.svg`
  padding: 0 16px;
  height: 24px;
  width: 24px;
  fill: none;
  cursor: pointer;
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

const MessageInput = () => {
  const [message, setMessage] = useState("")

  const sendMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log(message)
    setMessage("")
  }

  return (
    <Wrapper onSubmit={sendMessage}>
      <InputWrapper>
        <Svg
          aria-hidden="true"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="transparent"
            className=""
          ></circle>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-17a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z"
            clipRule="evenodd"
          ></path>
        </Svg>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
      </InputWrapper>
      <input type="submit" hidden />
    </Wrapper>
  )
}

export default MessageInput
