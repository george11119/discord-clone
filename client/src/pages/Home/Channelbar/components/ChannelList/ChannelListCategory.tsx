import styled from "styled-components"
import DropdownButton from "../../../../../shared/svg/DropdownButton.tsx"


const Wrapper = styled.div`
  padding-top: 16px;
  height: 24px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
`

const ChannelListCategory = ({ title }: { title: string }) => {
  return (
    <Wrapper>
      <DropdownButton size={12} />
      {title.toUpperCase()}
    </Wrapper>
  )
}

export default ChannelListCategory
