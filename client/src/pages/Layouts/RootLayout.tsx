import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../Auth/AuthContext.ts"

const RootLayout = () => {
  const { loggedIn } = useContext(AuthContext)

  return loggedIn ? <Outlet /> : <Navigate to="/login" replace={true} />
}

export default RootLayout
