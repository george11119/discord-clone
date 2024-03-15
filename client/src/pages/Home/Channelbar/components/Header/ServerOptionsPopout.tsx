import styled from "styled-components"
import useOnOutsideClick from "../../../../../hooks/useOnOutsideClick.ts"
import { motion } from "framer-motion"
import Separator from "../../../Sidebar/components/Separator.tsx"

const Wrapper = styled.div`
  position: absolute;
  top: 56px;
  left: 10px;
  width: 220px;
  background-color: #111214;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  align-items: center;
`

const Button = styled.button`
  background-color: inherit;
  padding: 0;
  margin: 6px 8px;
  border-style: none;
  color: inherit;
  height: 20px;
`

const ServerOptionsPopout = ({
  setPopoutOpen,
}: {
  setPopoutOpen: (popoutOpen: boolean) => void
}) => {
  const ref = useOnOutsideClick(() => setPopoutOpen(false))

  return (
    <Wrapper
      ref={ref}
      as={motion.div}
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Button>Invite People</Button>
      <Separator type="thin" width={192} />
      <Button>Invite People</Button>
      <Button>Invite People</Button>
      <Button>Invite People</Button>
      <Button>Invite People</Button>
    </Wrapper>
  )
}

export default ServerOptionsPopout
