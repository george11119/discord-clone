import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"

const ChannelListWrapper = styled.ul`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
`

const ChannelList = () => {
  return (
    <ChannelListWrapper>
      <ChannelListCategory title={"General"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
    </ChannelListWrapper>
  )
}

export default ChannelList
