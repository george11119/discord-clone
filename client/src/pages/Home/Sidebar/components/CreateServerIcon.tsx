import Icon from "./Icon.tsx"
import CreateServer from "../../../../shared/svg/CreateServer.tsx"
import useModal from "../../../../hooks/useModal.ts"
import Modal from "../../../../shared/components/Modal.tsx"
import { AnimatePresence } from "framer-motion"

const CreateServerIcon = () => {
  const { modalOpen, open, close } = useModal()

  return (
    <>
      <Icon
        name="Add a Server"
        link={"#"}
        icon={<CreateServer />}
        hoverColor="#23a559"
        onClick={() => (modalOpen ? close() : open())}
      />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <Modal
            handleClose={close}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default CreateServerIcon
