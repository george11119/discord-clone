import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 24px;
  height: 68px;
  user-select: none;
`

const Header = styled.h1`
  color: rgb(242, 243, 245);
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
`

const Div = styled.div`
  font-size: 14px;
  font-weight: 400;
`

const LoginHeader = () => {
  return (
    <Wrapper>
      <Header>Welcome back!</Header>
      <Div>We're so excited to see you again!</Div>
    </Wrapper>
  )
}

export default LoginHeader
