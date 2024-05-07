import ContextMenu from "../ContextMenu/ContextMenu.tsx"
import { ContextMenuObject } from "../../../hooks/useContextMenu.ts"
import ContextMenuButton from "../ContextMenu/ContextMenuButton.tsx"
import IDIcon from "../../svg/IDIcon.tsx"
import { Server } from "../../../../types.ts"
import serverQueries from "../../../api/queries/serverQueries.ts"
import { useNavigate } from "react-router-dom"
import { ModalOptions } from "../../../hooks/useModal.ts"

const ServerContextMenu = ({
  server,
  contextMenuState,
  close,
  inviteToServerModalOptions,
}: {
  server: Server
  contextMenuState: ContextMenuObject
  close: () => void
  inviteToServerModalOptions: ModalOptions
}) => {
  const leaveServerMutation = serverQueries.useLeaveServer(server.id)
  const navigate = useNavigate()

  const copyTextToClipboard = async () => {
    await navigator.clipboard.writeText(server.id)
    close()
  }

  const handleLeaveServer = () => {
    leaveServerMutation.mutate()
    close()
    navigate("/channels/@me")
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
        <ContextMenuButton text="Leave Server" onClick={handleLeaveServer} />
        <ContextMenuButton
          text="Copy Server ID"
          onClick={copyTextToClipboard}
          icon={<IDIcon size={24} />}
        />
      </ContextMenu>
    </>
  )
}

export default ServerContextMenu
