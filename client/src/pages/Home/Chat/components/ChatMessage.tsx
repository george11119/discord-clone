import styled from "styled-components"

const Wrapper = styled.li`
  margin-left: 16px;
  margin-top: 16px;
  display: flex;
  line-height: 1.375rem;

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

const ChatMessage = ({
  message,
  sender,
  createdAt,
}: {
  message: string
  sender: string
  createdAt: string
}) => {
  return (
    <Wrapper>
      <Img></Img>
      <div>
        <Sender>{sender}</Sender>
        <DateWrapper>{createdAt}</DateWrapper>
        <MessageWrapper>{message}</MessageWrapper>
      </div>
    </Wrapper>
  )
}

export default ChatMessage
