import Backdrop from "./Backdrop.tsx"
import styled from "styled-components"
import { motion } from "framer-motion"
import { ReactNode } from "react"

const modalAnimation = {
  hidden: {
    transform: "scale(0)",
    opacity: 0,
    transition: {
      delay: 0.25,
    },
  },
  visible: {
    transform: " scale(1)",
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    transform: "scale(0)",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
}

const Wrapper = styled.div`
  width: 440px;
  background-color: rgb(49, 51, 56);
  box-shadow:
    rgba(30, 31, 34, 0.6) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
  border-radius: 4px;
  position: relative;
`

const Modal = ({
  handleClose,
  children,
}: {
  handleClose: () => void
  children: ReactNode
}) => {
  return (
    <Backdrop onClick={handleClose}>
      <Wrapper
        as={motion.div}
        onClick={(e) => e.stopPropagation()}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </Wrapper>
    </Backdrop>
  )
}

export default Modal
