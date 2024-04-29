import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../Auth/AuthContext.ts"
import styled from "styled-components"

const BlankPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e1f22;
`

const RootLayout = () => {
  const { loggedIn } = useContext(AuthContext)

  if (loggedIn === undefined) return <BlankPage />

  // set this to true for no redirect problems
  return loggedIn ? <Outlet /> : <Navigate to={`/login`} replace={true} />
}

export default RootLayout
