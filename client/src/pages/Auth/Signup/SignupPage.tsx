import SignupForm from "./SignupForm.tsx"
import styled from "styled-components"
import { Link } from "react-router-dom"
import OAuthButtons from "../components/OAuthButtons.tsx"
import Divider from "./Divider.tsx"
import userService from "../../../services/userService.ts"
import { useContext } from "react"
import AuthContext from "../AuthContext.ts"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 416px;
`

const LinkWrapper = styled(Link)`
  color: rgb(0, 168, 252);
  text-decoration: none;
  height: 18px;
  font-size: 13px;

  &:visited {
    color: rgb(0, 168, 252);
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`

const SignupPage = () => {
  const { checkLoginState } = useContext(AuthContext)

  const handleSignup = async (
    username: string,
    password: string,
    email: string,
  ) => {
    const res = await userService.create({ username, password, email })
    localStorage.setItem("discord-clone-jwt-token", res.token)
    checkLoginState()
  }

  return (
    <Wrapper>
      <SignupForm handleSignup={handleSignup} />
      <Divider />
      <OAuthButtons isLoginPage={false} />
      <LinkWrapper to="/login">Already have an account?</LinkWrapper>
    </Wrapper>
  )
}

export default SignupPage
