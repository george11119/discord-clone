import { createContext } from "react"
import { User } from "./../../../types.ts"

type AuthContextType = {
  user: null | User
  loggedIn: boolean
  checkLoginState: () => void
  token: null | string
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: false,
  checkLoginState: () => {},
  token: null,
})

export default AuthContext
