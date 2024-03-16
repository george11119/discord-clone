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

const Title = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 180px;
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
      <Title>{title}</Title>
      {popoutOpen ? (
        <CloseIcon size={18} fill="rgb(219, 222, 225)" />
      ) : (
        <DropdownButton size={18} />
      )}
    </Wrapper>
  )
}

export default ChannelTitle
