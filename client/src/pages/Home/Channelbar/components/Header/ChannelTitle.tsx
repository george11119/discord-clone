import styled from "styled-components"
import DropdownButton from "../../../../../shared/svg/DropdownButton.tsx"
import CloseIcon from "../../../../../shared/svg/CloseIcon.tsx"

const Wrapper = styled.h1`
  margin-left: 6px;
  margin-right: 4px;
  display: flex;
  justify-content: space-between;
  width: 220px;
  align-items: center;
`

const ChannelTitle = ({
  title,
  popoutOpen,
}: {
  title: string
  popoutOpen: boolean
}) => {
  return (
    <Wrapper>
      <div>{title}</div>
      {popoutOpen ? (
        <CloseIcon size={18} fill="rgb(219, 222, 225)" />
      ) : (
        <DropdownButton size={18} />
      )}
    </Wrapper>
  )
}

export default ChannelTitle
