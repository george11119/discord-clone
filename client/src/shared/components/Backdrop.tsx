import { motion } from "framer-motion"
import styled from "styled-components"
import { ReactNode } from "react"

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000000e1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Backdrop = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) => {
  return (
    <Wrapper
      as={motion.div}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </Wrapper>
  )
}

export default Backdrop
