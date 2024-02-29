import styled from "styled-components"
import Hashtag from "../../../../../shared/svg/Hashtag.tsx"

const Wrapper = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 34px;
  bottom: -1px;
  top: -1px;
  border-radius: 4px;
  margin: 1px 0;
  padding: 0 12px;
  font-size: 16px;

  &:hover {
    background-color: #35373c;
    color: rgb(219, 222, 225);
  }
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
