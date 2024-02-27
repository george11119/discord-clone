import { createContext } from "react"

const AuthContext = createContext({
  user: null,
  loggedIn: false,
  checkLoginState: () => {},
})

export default AuthContext
