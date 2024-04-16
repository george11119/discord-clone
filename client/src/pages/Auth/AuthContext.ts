import { createContext } from "react"
import { User } from "./../../../types.ts"

type AuthContextType = {
  user: null | User
  loggedIn: boolean | undefined
  checkLoginState: () => void
  token: null | string
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: undefined,
  checkLoginState: () => {},
  token: null,
})

export default AuthContext
