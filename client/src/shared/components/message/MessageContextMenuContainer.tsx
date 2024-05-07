import { ContextMenuOptions } from "../../../hooks/useContextMenu.ts"
import { Message } from "../../../../types.ts"
import MessageContextMenu from "./MessageContextMenu.tsx"

const MessageContextMenuContainer = ({
  contextMenu,
  message,
}: {
  contextMenu: ContextMenuOptions
  message: Message
}) => {
  const { contextMenuState } = contextMenu
  return (
    <>
      {contextMenuState.show && (
        <MessageContextMenu
          message={message}
          contextMenuState={contextMenuState}
          close={contextMenu.close}
        />
      )}
    </>
  )
}

export default MessageContextMenuContainer
