import { ReactNode, useCallback, useEffect, useState } from "react"
import AuthContext from "./AuthContext.ts"
import axios from "axios"

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const checkLoginState = useCallback(async () => {
    const token = localStorage.getItem("discord-clone-jwt-token")

    try {
      const res = await axios.get(`http://localhost:3001/api/auth/logged_in`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const { loggedIn, user } = res.data

      setLoggedIn(loggedIn)
      user && setUser(user)

      console.log(`User:`, user)
      console.log(`Logged in: ${loggedIn}`)
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState])

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
