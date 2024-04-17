import { useState } from "react"

export type ModalOptions = {
  open: () => void
  close: () => void
  modalOpen: boolean
}

const useModal = (): ModalOptions => {
  const [modalOpen, setModalOpen] = useState(false)

  const open = () => setModalOpen(true)
  const close = () => setModalOpen(false)

  return { modalOpen, open, close }
}

export default useModal
