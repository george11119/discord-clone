import { useUserProfileModalOptionsStore } from "../../../stores/useUserProfileModalOptionsStore.ts"
import { AnimatePresence } from "framer-motion"
import UserProfileModal from "../../../shared/components/user/UserProfileModal.tsx"
import { User } from "../../../../types.ts"

const AdditionalComponents = () => {
  const { user, close, modalOpen } = useUserProfileModalOptionsStore()

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {modalOpen && (
        <UserProfileModal handleClose={close} user={user as User} />
      )}
    </AnimatePresence>
  )
}

export default AdditionalComponents
