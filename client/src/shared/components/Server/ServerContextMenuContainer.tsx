import { ContextMenuOptions } from "../../../hooks/useContextMenu.ts"
import { Server } from "../../../../types.ts"
import ServerContextMenu from "./ServerContextMenu.tsx"
import {AnimatePresence} from "framer-motion"
import InviteToServerModal from "../../../pages/Home/Channelbar/components/Header/InviteToServerModal.tsx"
import useModal from "../../../hooks/useModal.ts"

const ServerContextMenuContainer = ({
  contextMenu,
  server,
}: {
  contextMenu: ContextMenuOptions
  server: Server
}) => {
  const { contextMenuState } = contextMenu
  const inviteToServer = useModal()

  return (
    <>
      {contextMenuState.show && (
        <ServerContextMenu
          contextMenuState={contextMenuState}
          close={contextMenu.close}
          server={server}
          inviteToServerModalOptions={inviteToServer}
        />
      )}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {inviteToServer.modalOpen && (
          <InviteToServerModal handleClose={inviteToServer.close} />
        )}
      </AnimatePresence>
    </>
  )
}

export default ServerContextMenuContainer
