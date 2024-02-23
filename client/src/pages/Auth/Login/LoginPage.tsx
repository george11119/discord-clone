import LoginForm from "./LoginForm.tsx"
import styled from "styled-components"

const Wrapper = styled.div`
  height: 344px;
  width: 720px;
  padding: 32px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
  border-radius: 5px;
  background-color: rgb(49, 51, 56);
  color: rgb(181, 186, 193);
  display: flex;
`

const Box = styled.div`
  width: 240px;
  border: 1px solid red;
  margin-left: auto;
`

const LoginPage = () => {
  const handleLogin = (username: string, password: string): void => {
    console.log(username)
    console.log(password)
  }

  return (
    <Wrapper>
      <LoginForm handleLogin={handleLogin} />
      <Box></Box>
    </Wrapper>
  )
}

export default LoginPage
