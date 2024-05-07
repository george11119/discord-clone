import { Message } from "../../../../types.ts"
import { ContextMenuObject } from "../../../hooks/useContextMenu.ts"
import ContextMenu from "../ContextMenu/ContextMenu.tsx"
import ContextMenuButton from "../ContextMenu/ContextMenuButton.tsx"
import IDIcon from "../../svg/IDIcon.tsx"
import CopyTextIcon from "../../svg/CopyTextIcon.tsx"
import { MessageType } from "../../../../../types.ts"

const MessageContextMenu = ({
  message,
  contextMenuState,
  close,
}: {
  message: Message
  contextMenuState: ContextMenuObject
  close: () => void
}) => {
  const copyMessageIDToClipboard = async () => {
    await navigator.clipboard.writeText(message.id)
    close()
  }

  const copyMessageTextToClipboard = async () => {
    await navigator.clipboard.writeText(message.content)
    close()
  }

  return (
    <>
      <ContextMenu contextMenuState={contextMenuState} close={close}>
        {message.messageType === MessageType.NORMAL && (
          <ContextMenuButton
            text="Copy Message Text"
            onClick={copyMessageTextToClipboard}
            icon={<CopyTextIcon size={24} />}
          />
        )}
        <ContextMenuButton
          text="Copy Message ID"
          onClick={copyMessageIDToClipboard}
          icon={<IDIcon size={24} />}
        />
      </ContextMenu>
    </>
  )
}

export default MessageContextMenu
