import styled from "styled-components"
import ChannelListItem from "./ChannelListItem.tsx"
import ChannelListCategory from "./ChannelListCategory.tsx"
import LogoutButton from "../../../Auth/LogoutButton.tsx"

const Wrapper = styled.ul`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
  flex: 1 1 auto;
`

const ChannelList = () => {
  return (
    <Wrapper>
      <ChannelListCategory title={"General"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <ChannelListItem name={"asdf"} />
      <LogoutButton />
    </Wrapper>
  )
}

export default ChannelList
