import styled from "styled-components"
import { motion } from "framer-motion"
import Tooltip from "../../../shared/components/Tooltip.tsx"
import Logo from "../../../shared/svg/Logo.tsx"

const Wrapper = styled.div`
  height: 48px;
  width: 48px;
  background: rgb(49, 51, 56);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
`

const Icon = ({
  name,
  tooltip,
  isIcon,
}: {
  name: string
  tooltip?: string
  isIcon?: boolean
}) => {
  const firstLetter: string = name[0].toUpperCase()

  return (
    <div>
      <Tooltip tooltip={tooltip ? tooltip : name} placement="right">
        <Wrapper
          as={motion.div}
          whileHover={{
            backgroundColor: "rgb(88, 101, 242)",
            borderRadius: "18px",
            transition: { duration: 0.15 },
          }}
          whileTap={{
            translateY: 1.5,
            transition: { duration: 0 },
          }}
        >
          {isIcon ? <Logo /> : firstLetter}
        </Wrapper>
      </Tooltip>
    </div>
  )
}

export default Icon
