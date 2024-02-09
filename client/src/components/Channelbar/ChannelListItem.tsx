import styled from "styled-components"
import Hashtag from "../shared/svg/Hashtag.tsx"

const Wrapper = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 34px;
  bottom: -1px;
  top: -1px;
  border-radius: 4px;
  margin: 1px 0;
  font-size: 16px;
`
const ChannelListItem = ({ name }: { name: string }) => {
  return (
    <Wrapper>
      <Hashtag size={20} />
      {name}
    </Wrapper>
  )
}

export default ChannelListItem
