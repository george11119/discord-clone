import styled from "styled-components"
import { motion } from "framer-motion"
import Tooltip from "../../../../shared/components/Tooltip.tsx"
import { matchPath, NavLink, useLocation } from "react-router-dom"
import { ReactNode } from "react"

export const LinkWrapper = styled(NavLink)`
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
  link,
  icon,
  hoverColor = "rgb(88, 101, 242)",
  onClick,
}: {
  name: string
  link: string
  tooltip?: string
  icon?: ReactNode
  hoverColor?: string
  onClick?: () => void
}) => {
  const { pathname } = useLocation()
  const isActive = matchPath(`${link}/*`, pathname)

  const activeStyle = {
    backgroundColor: hoverColor,
    borderRadius: "18px",
  }

  return (
    <div data-testid={name}>
      <Tooltip tooltip={tooltip ? tooltip : name} placement="right">
        <LinkWrapper
          to={`${link}`}
          style={isActive ? activeStyle : {}}
          onClick={onClick}
        >
          <Wrapper
            as={motion.div}
            whileHover={
              isActive
                ? {}
                : {
                    backgroundColor: hoverColor,
                    borderRadius: "18px",
                    transition: { duration: 0.15 },
                  }
            }
          >
            {icon ? icon : name[0].toUpperCase()}
          </Wrapper>
        </LinkWrapper>
      </Tooltip>
    </div>
  )
}

export default Icon
