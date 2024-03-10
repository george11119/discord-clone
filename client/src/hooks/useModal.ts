import { useState } from "react"

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const open = () => setModalOpen(true)
  const close = () => setModalOpen(false)

  return { modalOpen, open, close }
}

export default useModal
