import { useContext } from "react"
import AuthContext from "./AuthContext.ts"

const Login = () => {
  const { checkLoginState } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("discord-clone-jwt-token")
    checkLoginState()
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Login
