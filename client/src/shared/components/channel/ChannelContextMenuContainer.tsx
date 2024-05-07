import { ContextMenuOptions } from "../../../hooks/useContextMenu.ts"
import { Channel } from "../../../../types.ts"
import ChannelContextMenu from "./ChannelContextMenu.tsx"
import useModal from "../../../hooks/useModal.ts"
import { AnimatePresence } from "framer-motion"
import InviteToServerModal from "../../../pages/Home/Channelbar/components/Header/InviteToServerModal.tsx"

const ChannelContextMenuContainer = ({
  contextMenu,
  channel,
}: {
  contextMenu: ContextMenuOptions
  channel: Channel
}) => {
  const { contextMenuState } = contextMenu
  const inviteToServer = useModal()

  return (
    <>
      {contextMenuState.show && (
        <ChannelContextMenu
          channel={channel}
          contextMenuState={contextMenuState}
          close={contextMenu.close}
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

export default ChannelContextMenuContainer
