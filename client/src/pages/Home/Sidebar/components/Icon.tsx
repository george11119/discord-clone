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
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

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

const BadgeWrapper = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  padding: 4px;
  background-color: #1e1f22;
  border-radius: 12px;
`

const Icon = ({
  name,
  tooltip,
  link,
  icon,
  hoverColor = "rgb(88, 101, 242)",
  onClick,
  badge,
  color,
  canBeActive,
}: {
  name: string
  link: string
  tooltip?: string
  icon?: ReactNode
  hoverColor?: string
  onClick?: () => void
  badge?: ReactNode
  color?: string
  canBeActive?: "no"
}) => {
  const { pathname } = useLocation()

  const splitLink = link.split("/")
  const isActive = matchPath(`/${splitLink[1]}/${splitLink[2]}/*`, pathname)

  const activeStyle = {
    backgroundColor: hoverColor,
    borderRadius: "18px",
  }

  return (
    <div data-testid={name}>
      <Tooltip tooltip={tooltip ? tooltip : name} placement="right">
        <LinkWrapper
          to={`${link}`}
          style={
            isActive && canBeActive !== "no"
              ? activeStyle
              : {
                  backgroundColor: color ? color : "" + "rgb(49, 51, 56)",
                }
          }
          onClick={onClick}
        >
          <Wrapper
            as={motion.div}
            whileHover={
              isActive && canBeActive !== "no"
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
          <BadgeWrapper>{badge}</BadgeWrapper>
        </LinkWrapper>
      </Tooltip>
    </div>
  )
}

export default Icon
