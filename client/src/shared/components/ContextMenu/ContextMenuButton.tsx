import styled from "styled-components"
import {ReactNode} from "react"

const ContextMenuButtonWrapper = styled.button`
  padding: 6px 8px;
  height: 32px;
  margin: 2px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(181, 186, 193);
  background-color: #111214;
  border: none;
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #5865f2;
  }
`

const ContextMenuButton = ({
                             text,
                             icon,
                             onClick,
                           }: {
  text: string
  icon?: ReactNode
  onClick: () => void
}) => {
  return (
    <ContextMenuButtonWrapper onClick={onClick}>
      {text}
      {icon}
    </ContextMenuButtonWrapper>
  )
}

export default ContextMenuButton
