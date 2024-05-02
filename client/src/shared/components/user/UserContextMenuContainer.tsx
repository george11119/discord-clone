import { ContextMenuObject } from "../../../hooks/useContextMenu.ts"
import { User } from "../../../../types.ts"
import UserContextMenu from "./UserContextMenu.tsx"
import { AnimatePresence } from "framer-motion"
import UserProfileModal from "./UserProfileModal.tsx"
import { ModalOptions } from "../../../hooks/useModal.ts"

const UserContextMenuContainer = ({
  contextMenuState,
  user,
  modal,
  closeContextMenu,
}: {
  contextMenuState: ContextMenuObject
  user: User
  modal: ModalOptions
  closeContextMenu: () => void
}) => {
  return (
    <>
      {contextMenuState.show && (
        <UserContextMenu
          modal={modal}
          contextMenuState={contextMenuState}
          close={closeContextMenu}
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
