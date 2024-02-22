import LoginForm from "./LoginForm.tsx"

const LoginPage = () => {
  const handleLogin = (username: string, password: string): void => {
    console.log(username)
    console.log(password)
  }

  return <LoginForm handleLogin={handleLogin} />
}

export default LoginPage
