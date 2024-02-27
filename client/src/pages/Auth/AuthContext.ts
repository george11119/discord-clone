import { createContext } from "react"

type AuthContextType = {
  user: null | object
  loggedIn: boolean
  checkLoginState: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: false,
  checkLoginState: () => {},
})

export default AuthContext
