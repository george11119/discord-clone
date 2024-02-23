import LoginForm from "./LoginForm.tsx"
import styled from "styled-components"
import OAuthButtons from "./OAuthButtons.tsx"
import { motion } from "framer-motion"


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


const LoginPage = () => {
  const handleLogin = (username: string, password: string): void => {
    console.log(username)
    console.log(password)
  }

  return (
    <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <LoginForm handleLogin={handleLogin} />
      <OAuthButtons />
    </Wrapper>
  )
}

export default LoginPage
