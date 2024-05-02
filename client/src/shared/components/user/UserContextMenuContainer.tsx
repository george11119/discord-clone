import { ContextMenuOptions } from "../../../hooks/useContextMenu.ts"
import { User } from "../../../../types.ts"
import UserContextMenu from "./UserContextMenu.tsx"
import { AnimatePresence } from "framer-motion"
import UserProfileModal from "./UserProfileModal.tsx"
import { ModalOptions } from "../../../hooks/useModal.ts"

const UserContextMenuContainer = ({
  contextMenu,
  user,
  modal,
}: {
  contextMenu: ContextMenuOptions
  user: User
  modal: ModalOptions
}) => {
  const { contextMenuState } = contextMenu
  return (
    <>
      {contextMenuState.show && (
        <UserContextMenu
          modal={modal}
          contextMenuState={contextMenuState}
          close={contextMenu.close}
          user={user}
        />
      )}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modal.modalOpen && (
          <UserProfileModal handleClose={modal.close} user={user} />
        )}
      </AnimatePresence>
    </>
  )
}

export default UserContextMenuContainer
