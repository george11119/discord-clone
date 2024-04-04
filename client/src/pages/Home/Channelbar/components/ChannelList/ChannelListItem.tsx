import styled from "styled-components"
import Hashtag from "../../../../../shared/svg/Hashtag.tsx"
import { Channel } from "../../../../../../types.ts"
import { matchPath, NavLink, useLocation } from "react-router-dom"
import SettingsButton from "../../../../../shared/svg/SettingsButton.tsx"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"
import { FormEvent, useState } from "react"
import useModal from "../../../../../hooks/useModal.ts"
import { AnimatePresence } from "framer-motion"
import ChannelModal from "./ChannelModal.tsx"

const LinkWrapper = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  cursor: pointer;
  display: flex;
  align-items: center;
  height: 34px;
  border-radius: 4px;
  margin: 1px 0;
  padding: 0 12px;
  font-size: 14px;
  justify-content: space-between;

  &:hover {
    background-color: rgba(78, 80, 88, 0.6);
    color: rgb(229, 232, 235);
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const HashtagContainer = styled.div`
  flex-shrink: 0;
`

const ChannelName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Right = styled.div<{ $isActive: any; $isHovered: boolean }>`
  display: ${(props) =>
    props.$isActive || props.$isHovered ? "flex" : "none"};
  align-items: center;
  margin-left: 12px;
`

const SettingsButtonContainer = styled.div``

const ChannelListItem = ({ channel }: { channel: Channel }) => {
  const [hovered, setHovered] = useState(false)
  const { modalOpen, open, close } = useModal()
  const { pathname } = useLocation()
  const isActive = matchPath(
    `/channels/${channel.serverId}/${channel.id}`,
    pathname,
  )

  const activeStyle = {
    backgroundColor: "rgba(78, 80, 88, 0.6)",
    color: "rgb(229, 232, 235)",
    fontWeight: 600,
  }

  const handleClick = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    modalOpen ? close() : open()
  }

  return (
    <>
      <LinkWrapper
        style={isActive ? activeStyle : {}}
        to={`/channels/${channel.serverId}/${channel.id}`}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <Left>
          <HashtagContainer>
            <Hashtag size={20} color="#737881" />
          </HashtagContainer>
          <ChannelName>{channel.name}</ChannelName>
        </Left>
        <Right $isActive={isActive} $isHovered={hovered}>
          <Tooltip tooltip="Edit Channel" placement="top">
            <SettingsButtonContainer onClick={handleClick}>
              <SettingsButton size={16} color={"rgb(181, 186, 193)"} />
            </SettingsButtonContainer>
          </Tooltip>
        </Right>
      </LinkWrapper>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <ChannelModal
            handleClose={close}
            type="edit"
            initialChannelName={channel.name}
            channelId={channel.id}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ChannelListItem
