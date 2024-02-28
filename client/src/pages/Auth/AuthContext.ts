import { createContext } from "react"
import { User } from "./../../../types.ts"

type AuthContextType = {
  user: null | User
  loggedIn: boolean
  checkLoginState: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: false,
  checkLoginState: () => {},
})

export default AuthContext
