import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../routes/Router.tsx"
import { useContext } from "react"

const RootLayout = () => {
  const { loggedIn } = useContext(AuthContext)

  return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default RootLayout
