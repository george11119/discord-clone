import styled from "styled-components"
import { motion } from "framer-motion"
import Tooltip from "../../../../shared/components/Tooltip.tsx"
import Logo from "../../../../shared/svg/Logo.tsx"
import { NavLink } from "react-router-dom"

const LinkWrapper = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  background: rgb(49, 51, 56);
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    transform: translateY(1px);
  }
`

const Wrapper = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    transform: translateY(1px);
  }
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

  const activeStyle = {
    backgroundColor: "rgb(88, 101, 242)",
    borderRadius: "18px",
  }

  return (
    <div>
      <Tooltip tooltip={tooltip ? tooltip : name} placement="right">
        <LinkWrapper
          style={({ isActive }) => (isActive ? activeStyle : {})}
          to={`/channels/${link}`}
        >
          <Wrapper
            as={motion.div}
            whileHover={{
              backgroundColor: "rgb(88, 101, 242)",
              borderRadius: "18px",
              transition: { duration: 0.15 },
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
