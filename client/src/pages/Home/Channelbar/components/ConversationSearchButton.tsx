import styled from "styled-components"

const Wrapper = styled.button`
  color: rgb(148, 155, 164);
  background-color: rgb(30, 31, 34);
  border-style: none;
  padding: 1px 6px;
  height: 28px;
  width: 220px;
  text-align: left;
  border-radius: 4px;
  cursor: pointer;
`

const ConversationSearchButton = () => {
  const handleClick = () => {
    alert("Not implemented")
  }

  return <Wrapper onClick={handleClick}>Find or start a conversation</Wrapper>
}

export default ConversationSearchButton
