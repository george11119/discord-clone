import dummyUser from "../../utils/dummyUser.ts"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(88, 101, 242);
`

const Modal = styled.div<{ height: number; width: number }>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  padding: 32px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
  border-radius: 5px;
  background-color: rgb(49, 51, 56);
  color: rgb(181, 186, 193);
  display: flex;
`

const AuthLayout = () => {
  const location = useLocation()
  const { isLoggedIn } = dummyUser

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <Wrapper>
      <Modal
        width={location.pathname === "/login" ? 720 : 416}
        height={location.pathname === "/login" ? 344 : 616}
        as={motion.div}
        key={location.pathname}
        initial={{ opacity: 0, y: -75 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Outlet />
      </Modal>
    </Wrapper>
  )
}

export default AuthLayout
