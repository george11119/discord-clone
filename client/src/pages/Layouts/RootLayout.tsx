import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../Auth/AuthContext.ts"

const RootLayout = () => {
  // const location = useLocation()
  // console.log(location)
  const { loggedIn } = useContext(AuthContext)

  if (loggedIn === undefined) return <div></div>

  // set this to true for no redirect problems
  return loggedIn ? <Outlet /> : <Navigate to={`/login`} replace={true} />
}

export default RootLayout
