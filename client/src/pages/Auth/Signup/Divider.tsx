import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  align-items: center;
  font-size: 14px;
`

const Line = styled.div`
  border-bottom: 1px solid rgb(121, 126, 133);
  display: block;
  flex-grow: 1;
`

const Text = styled.div`
  padding: 0 12px;
`

const Divider = () => {
  return (
    <Wrapper>
      <Line></Line>
      <Text>or</Text>
      <Line></Line>
    </Wrapper>
  )
}

export default Divider
