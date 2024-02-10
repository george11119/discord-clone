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

const Img = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 16px;
  margin-top: 2px;
`

const DateWrapper = styled.span`
  margin-left: 8px;
  color: rgb(148, 155, 164);
  font-size: 12px;
`

const MessageWrapper = styled.div`
  font-weight: 400;
`

const ChatMessage = ({
  message,
  sender,
}: {
  message: string
  sender: string
}) => {
  return (
    <Wrapper>
      <Img
        src="https://cdn.discordapp.com/avatars/902798265907568691/d50e04c7bb07fdb078cbdb9b7336315f.webp?size=100"
        alt="discord profile picture"
      />
      <div>
        <span>{sender}</span>
        <DateWrapper>02/09/2024 2:58 PM</DateWrapper>
        <MessageWrapper>{message}</MessageWrapper>
      </div>
    </Wrapper>
  )
}

export default ChatMessage
