import LoginForm from "./LoginForm.tsx"
import OAuthButtons from "../components/OAuthButtons.tsx"
import HorizontalSpacer from "../../../shared/components/HorizontalSpacer.tsx"
import loginService from "../../../services/loginService.ts"

const LoginPage = () => {
  const handleLogin = async (
    username: string,
    password: string,
  ): Promise<void> => {
    await loginService.login({ username, password })
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
