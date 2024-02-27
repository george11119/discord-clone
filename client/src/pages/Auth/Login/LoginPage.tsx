import LoginForm from "./LoginForm.tsx"
import OAuthButtons from "../components/OAuthButtons.tsx"
import HorizontalSpacer from "../../../shared/components/HorizontalSpacer.tsx"
import loginService from "../../../services/loginService.ts"

const LoginPage = () => {
  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    const res = await loginService.login({ email, password })
    localStorage.setItem("discord-clone-jwt-token", res.token)
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
