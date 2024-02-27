import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../pages/App/App.tsx"
import RootLayout from "../pages/layouts/RootLayout.tsx"
import AuthLayout from "../pages/layouts/AuthLayout.tsx"
import LoginPage from "../pages/Auth/Login/LoginPage.tsx"
import SignupPage from "../pages/Auth/Signup/SignupPage.tsx"
import { AnimatePresence } from "framer-motion"
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react"
import axios from "axios"

// TODO move this out into its own file and rewrite this
const AuthContext = createContext()

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)

  const checkLoginState = useCallback(async () => {
    const token = localStorage.getItem("discord-clone-jwt-token")

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    console.log("Config:", config)

    try {
      const {
        data: { loggedIn, user },
      } = await axios.get(`http://localhost:3001/api/auth/logged_in`, config)
      setLoggedIn(loggedIn)
      user && setUser(user)
      console.log("user:", user)
      console.log("loggedIn:", loggedIn)
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

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <App /> }],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
  ])

  return (
    <AuthContextProvider>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    </AuthContextProvider>
  )
}

export default Router
