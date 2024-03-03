import styled from "styled-components"
import { motion } from "framer-motion"
import Tooltip from "../../../../shared/components/Tooltip.tsx"
import Logo from "../../../../shared/svg/Logo.tsx"
import { Link } from "react-router-dom"

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  border-radius: 50%;
`

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
  isHomeIcon,
  link,
}: {
  name: string
  link: string
  tooltip?: string
  isHomeIcon?: boolean
}) => {
  const firstLetter: string = name[0].toUpperCase()

  return (
    <div>
      <Tooltip tooltip={tooltip ? tooltip : name} placement="right">
        <LinkWrapper to={`/channels/${link}`}>
          <Wrapper
            tabIndex={-1}
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
            {isHomeIcon ? <Logo /> : firstLetter}
          </Wrapper>
        </LinkWrapper>
      </Tooltip>
    </div>
  )
}

export default Icon
