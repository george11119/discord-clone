import styled from "styled-components"
import DropdownButton from "../../../../../shared/svg/DropdownButton.tsx"
import { ReactNode, useState } from "react"
import AddIcon from "../../../../../shared/svg/AddIcon.tsx"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"

const Wrapper = styled.div`
  padding-top: 16px;
  height: 24px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.div<{ $isHovered: boolean }>`
  color: ${(props) => (props.$isHovered ? "#fff6f9" : "inherit")};
  display: flex;
  align-items: center;
`

const AddChannelButton = styled.div`
  &:hover {
    color: #fff6f9
  }
`

const ChannelListCategory = ({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <Wrapper
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Title $isHovered={isHovered}>
          <DropdownButton size={12} isOpen={isOpen} />
          {title.toUpperCase()}
        </Title>

        <Tooltip tooltip="Create Channel" placement="right">
          <AddChannelButton
            onClick={(e) => {
              e.stopPropagation()
              console.log("clicked")
            }}
            style={{ marginRight: "8px" }}
          >
            <AddIcon size={18} />
          </AddChannelButton>
        </Tooltip>
      </Wrapper>
      <div style={{ display: isOpen ? "block" : "none" }}>{children}</div>
    </>
  )
}

export default ChannelListCategory
