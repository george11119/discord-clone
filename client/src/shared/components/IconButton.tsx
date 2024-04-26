import styled from "styled-components"
import { ReactNode } from "react"
import Tooltip from "./Tooltip.tsx"

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 8px;
  color: "#b5bac1";
`

const IconWrapper = styled.div`
  cursor: pointer;
  color: #b5bac1;

  &:hover {
    color: rgb(229, 232, 235);
  }
`

const IconButton = ({
  children,
  onClick,
  tooltip,
}: {
  children: ReactNode
  onClick?: () => void
  tooltip?: string
}) => {
  return (
    <IconContainer>
      <Tooltip tooltip={tooltip ? tooltip : ""} placement="bottom">
        <IconWrapper onClick={onClick}>{children}</IconWrapper>
      </Tooltip>
    </IconContainer>
  )
}

export default IconButton
