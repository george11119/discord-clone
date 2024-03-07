import styled from "styled-components"
import Hashtag from "../../../../../shared/svg/Hashtag.tsx"
import { Channel } from "../../../../../../types.ts"
import { NavLink } from "react-router-dom"

const LinkWrapper = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  cursor: pointer;
  display: flex;
  align-items: center;
  height: 34px;
  bottom: -1px;
  top: -1px;
  border-radius: 4px;
  margin: 1px 0;
  padding: 0 12px;
  font-size: 14px;

  &:hover {
    background-color: rgba(78, 80, 88, 0.6);
    color: rgb(229, 232, 235);
  }
`

const ChannelListItem = ({ channel }: { channel: Channel }) => {
  const activeStyle = {
    backgroundColor: "rgba(78, 80, 88, 0.6)",
    color: "rgb(229, 232, 235)",
  }
  return (
    <LinkWrapper
      style={({ isActive }) => (isActive ? activeStyle : {})}
      to={`/channels/${channel.serverId}/${channel.id}`}
    >
      <Hashtag size={20} />
      {channel.name}
    </LinkWrapper>
  )
}

export default ChannelListItem
