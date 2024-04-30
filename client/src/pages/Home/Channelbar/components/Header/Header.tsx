import styled from "styled-components"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import ChannelTitle from "./ChannelTitle.tsx"
import { useParams } from "react-router-dom"
import { useState } from "react"
import ServerOptionsPopout from "./ServerOptionsPopout.tsx"
import { Server } from "../../../../../../types.ts"
import { AnimatePresence } from "framer-motion"
import useModal from "../../../../../hooks/useModal.ts"
import EditServerModal from "./EditServerModal.tsx"
import ChannelModal from "../ChannelList/ChannelModal.tsx"
import InviteToServerModal from "./InviteToServerModal.tsx"
import useServerStore from "../../../../../api/stores/serverStore.ts"

const Wrapper = styled.div`
  box-shadow:
    rgba(2, 2, 2, 0.2) 0px 1px 0px 0px,
    rgba(6, 6, 7, 0.05) 0px 1.5px 0px 0px,
    rgba(2, 2, 2, 0.05) 0px 2px 0px 0px;
  height: 24px;
  padding: 12px 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  overflow: initial;
  transition-duration: 0.15s;
  user-select: none;

  &:hover {
    background-color: #35373c;
  }
`

const Header = () => {
  const { serverId } = useParams()
  const serverStore = useServerStore()

  const [popoutOpen, setPopoutOpen] = useState(false)
  const editChannel = useModal()
  const createChannel = useModal()
  const inviteToServer = useModal()

  const togglePopoutVisibility = (e: any) => {
    e.stopPropagation()
    setPopoutOpen(!popoutOpen)
  }

  const servers = serverStore.get()
  const server = servers
    ? (servers.find((s) => s.id === serverId) as Server)
    : null

  return (
    <>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {editChannel.modalOpen && (
          <EditServerModal handleClose={editChannel.close} />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {createChannel.modalOpen && (
          <ChannelModal type="create" handleClose={createChannel.close} />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {inviteToServer.modalOpen && (
          <InviteToServerModal handleClose={inviteToServer.close} />
        )}
      </AnimatePresence>

      <div style={{ position: "relative" }} data-testid="channelbar-header">
        {popoutOpen && (
          <ServerOptionsPopout
            setPopoutOpen={setPopoutOpen}
            editChannel={editChannel}
            createChannel={createChannel}
            inviteToServer={inviteToServer}
          />
        )}
        <Wrapper
          onClick={togglePopoutVisibility}
          style={popoutOpen ? { backgroundColor: "#35373c" } : {}}
        >
          <ChannelTitle
            title={server ? server.name : ""}
            popoutOpen={popoutOpen}
          />
        </Wrapper>
        <VerticalSpacer height={8} />
      </div>
    </>
  )
}

export default Header
