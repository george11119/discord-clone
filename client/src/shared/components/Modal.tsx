import Backdrop from "./Backdrop.tsx"
import styled from "styled-components"
import { motion } from "framer-motion"

const Wrapper = styled.div`
  height: 100px;
  width: 100px;
  background-color: red;
`

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
}

const Modal = ({
  handleClose,
  text,
}: {
  handleClose: () => void
  text: string
}) => {
  return (
    <Backdrop onClick={handleClose}>
      <Wrapper
        as={motion.div}
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{text}</p>
        <button onClick={handleClose}>close</button>
      </Wrapper>
    </Backdrop>
  )
}

export default Modal
