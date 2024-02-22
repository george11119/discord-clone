import dummyUser from "../../utils/dummyUser.ts"
import { Navigate, Outlet } from "react-router-dom"

const RootLayout = () => {
  const { isLoggedIn } = dummyUser

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default RootLayout
