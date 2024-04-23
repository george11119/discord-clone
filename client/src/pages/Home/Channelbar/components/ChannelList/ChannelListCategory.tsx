import styled from "styled-components"
import DropdownButton from "../../../../../shared/svg/DropdownButton.tsx"
import { ReactNode, useState } from "react"
import AddIcon from "../../../../../shared/svg/AddIcon.tsx"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"
import useModal from "../../../../../hooks/useModal.ts"
import ChannelModal from "./ChannelModal.tsx"
import { AnimatePresence } from "framer-motion"

const Wrapper = styled.div`
  padding-top: 16px;
  height: 24px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`

const Title = styled.div<{ $isHovered: boolean }>`
  color: ${(props) => (props.$isHovered ? "#fff6f9" : "inherit")};
  display: flex;
  align-items: center;
`

const AddChannelButton = styled.div`
  &:hover {
    color: #fff6f9;
  }
`

const ChannelListCategory = ({
  title,
  children,
  showAddChannelButton = true,
}: {
  title: string
  children?: ReactNode
  showAddChannelButton?: boolean
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const { open, close, modalOpen } = useModal()

  return (
    <>
      <Wrapper
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Title $isHovered={isHovered}>
          <DropdownButton size={12} isOpen={dropdownIsOpen} />
          {title.toUpperCase()}
        </Title>

        {showAddChannelButton && (
          <Tooltip tooltip="Create Channel" placement="right">
            <AddChannelButton
              onClick={(e) => {
                e.stopPropagation()
                modalOpen ? close() : open()
              }}
              style={{ marginRight: "8px" }}
            >
              <AddIcon size={18} />
            </AddChannelButton>
          </Tooltip>
        )}
      </Wrapper>
      <div style={{ display: dropdownIsOpen ? "block" : "none" }}>
        {children}
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <ChannelModal type="create" handleClose={close} />}
      </AnimatePresence>
    </>
  )
}

export default ChannelListCategory
