import styled from "styled-components"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import ConversationSearchButton from "./ConversationSearchButton.tsx"
import ChannelTitle from "./ChannelTitle.tsx"
import {matchPath, useLocation, useParams} from "react-router-dom"
import {useState} from "react"
import ServerOptionsPopout from "./ServerOptionsPopout.tsx"
import {Server} from "../../../../../../types.ts"
import {useQueryClient} from "@tanstack/react-query"
import {AnimatePresence} from "framer-motion"
import useModal from "../../../../../hooks/useModal.ts"
import EditServerModal from "./EditServerModal.tsx"
import ChannelModal from "../ChannelList/ChannelModal.tsx"
import InviteToServerModal from "./InviteToServerModal.tsx"

const Wrapper = styled.div<{ $isHomeLink: boolean }>`
  box-shadow: rgba(2, 2, 2, 0.2) 0px 1px 0px 0px,
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
    background-color: ${(props) =>
        props.$isHomeLink ? "inherit" : " #35373c"};
  }
;
}
`

const Header = () => {
  const queryClient = useQueryClient()
  const {serverId} = useParams()

  const [popoutOpen, setPopoutOpen] = useState(false)
  const {pathname} = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname) ? true : false
  const editChannel = useModal()
  const createChannel = useModal()
  const inviteToServer = useModal()

  const togglePopoutVisibility = (e: any) => {
    e.stopPropagation()
    setPopoutOpen(!popoutOpen)
  }

  const servers: Server[] | undefined = queryClient.getQueryData(["servers"])

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

      <div style={{position: "relative"}}>
        {popoutOpen && (
          <ServerOptionsPopout
            setPopoutOpen={setPopoutOpen}
            editChannel={editChannel}
            createChannel={createChannel}
            inviteToServer={inviteToServer}
          />
        )}
        <Wrapper
          onClick={isHomeLink ? () => null : togglePopoutVisibility}
          style={popoutOpen ? {backgroundColor: "#35373c"} : {}}
          $isHomeLink={isHomeLink}
        >
          {isHomeLink ? (
            <ConversationSearchButton />
          ) : (
            <ChannelTitle
              title={server ? server.name : ""}
              popoutOpen={popoutOpen}
            />
          )}
        </Wrapper>
        <VerticalSpacer height={8} />
      </div>
    </>
  )
}

export default Header
