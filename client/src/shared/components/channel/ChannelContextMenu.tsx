import { Channel } from "../../../../types.ts"
import { ContextMenuObject } from "../../../hooks/useContextMenu.ts"
import ContextMenu from "../ContextMenu/ContextMenu.tsx"
import ContextMenuButton from "../ContextMenu/ContextMenuButton.tsx"
import IDIcon from "../../svg/IDIcon.tsx"
import { ModalOptions } from "../../../hooks/useModal.ts"

const ChannelContextMenu = ({
  channel,
  contextMenuState,
  close,
  inviteToServerModalOptions,
}: {
  channel: Channel
  contextMenuState: ContextMenuObject
  close: () => void
  inviteToServerModalOptions: ModalOptions
}) => {
  const copyChannelIDToClipboard = async () => {
    await navigator.clipboard.writeText(channel.id)
    close()
  }

  const copyChannelLinkToClipboard = async () => {
    const { href } = window.location
    await navigator.clipboard.writeText(href)
    close()
  }

  const handleInvitePeopleClicked = () => {
    inviteToServerModalOptions.open()
    close()
  }

  return (
    <>
      <ContextMenu contextMenuState={contextMenuState} close={close}>
        <ContextMenuButton
          text="Invite People"
          onClick={handleInvitePeopleClicked}
        />
        <ContextMenuButton
          text="Copy Channel Link"
          onClick={copyChannelLinkToClipboard}
        />
        <ContextMenuButton
          text="Copy Channel ID"
          onClick={copyChannelIDToClipboard}
          icon={<IDIcon size={24} />}
        />
      </ContextMenu>
    </>
  )
}

export default ChannelContextMenu
