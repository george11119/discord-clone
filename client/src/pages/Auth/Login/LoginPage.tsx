import LoginForm from "./LoginForm.tsx"
import OAuthButtons from "../components/OAuthButtons.tsx"
import HorizontalSpacer from "../../../shared/components/HorizontalSpacer.tsx"

const LoginPage = () => {
  const handleLogin = (username: string, password: string): void => {
    console.log(username)
    console.log(password)
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
