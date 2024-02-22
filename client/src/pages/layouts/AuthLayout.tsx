import dummyUser from "../../utils/dummyUser.ts"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
  const { isLoggedIn } = dummyUser
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />
}

export default AuthLayout
