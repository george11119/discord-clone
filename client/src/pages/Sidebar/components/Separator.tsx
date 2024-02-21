import styled from "styled-components"

const Wrapper = styled.div`
  min-height: 2px;
  width: 32px;
  border-radius: 1px;
  background-color: rgba(78, 80, 88, 0.48);
`

const Separator = () => {
  return (
    <Wrapper>
      <div></div>
    </Wrapper>
  )
}

export default Separator
