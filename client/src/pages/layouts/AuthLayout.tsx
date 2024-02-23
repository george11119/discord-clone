import dummyUser from "../../utils/dummyUser.ts"
import { Navigate, Outlet } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(88, 101, 242);
`

const AuthLayout = () => {
  const { isLoggedIn } = dummyUser
  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}

export default AuthLayout
