import { ReactNode, useCallback, useEffect, useState } from "react"
import AuthContext from "./AuthContext.ts"
import axios from "axios"
import config from "../../config/config.ts"

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState<string | null>(null)

  const checkLoginState = useCallback(async () => {
    const token = localStorage.getItem("discord-clone-jwt-token")

    try {
      const res = await axios.get(`${config.API_ENDPOINT}/auth/logged_in`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const { loggedIn, user } = res.data

      setLoggedIn(loggedIn)
      user && setUser(user)
      token && user && setToken(token)
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState])

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
