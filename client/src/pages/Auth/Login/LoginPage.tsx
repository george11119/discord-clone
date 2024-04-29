import LoginForm from "./LoginForm.tsx"
import OAuthButtons from "../components/OAuthButtons.tsx"
import HorizontalSpacer from "../../../shared/components/HorizontalSpacer.tsx"
import loginService from "../../../api/services/loginService.ts"
import { useContext } from "react"
import AuthContext from "../AuthContext.ts"

const LoginPage = () => {
  const { checkLoginState } = useContext(AuthContext)

  const handleLogin = async (
    username: string,
    password: string,
  ): Promise<void> => {
    const res = await loginService.login({ email: username, password })
    localStorage.setItem("discord-clone-jwt-token", res.token)
    checkLoginState()
  }

  return (
    <>
      <LoginForm handleLogin={handleLogin} />
      <HorizontalSpacer width={64} />
      <OAuthButtons isLoginPage={true} />
    </>
  )
}

export default LoginPage
