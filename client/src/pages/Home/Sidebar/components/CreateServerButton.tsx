import Icon from "./Icon.tsx"
import CreateServerIcon from "../../../../shared/svg/CreateServer.tsx"
import useModal from "../../../../hooks/useModal.ts"
import { AnimatePresence } from "framer-motion"
import CreateServerModal from "./CreateServerModal.tsx"

const CreateServerButton = () => {
  const { modalOpen, open, close } = useModal()

  return (
    <>
      <Icon
        name="Add a Server"
        link={"#"}
        icon={<CreateServerIcon />}
        hoverColor="#23a559"
        onClick={() => (modalOpen ? close() : open())}
      />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <CreateServerModal handleClose={close} />}
      </AnimatePresence>
    </>
  )
}

export default CreateServerButton
