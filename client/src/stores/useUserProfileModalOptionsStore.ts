import { create } from "zustand"
import { User } from "../../types.ts"

interface ModalOptionsState {
  modalOpen: boolean
  user: User | null
  open: () => void
  close: () => void
  setUser: (u: User | null) => void
}

export const useUserProfileModalOptionsStore = create<ModalOptionsState>()(
  (set) => ({
    modalOpen: false,
    user: null,
    open: () => set(() => ({ modalOpen: true })),
    close: () => set(() => ({ modalOpen: false })),
    setUser: (u) => set(() => ({ user: u })),
  }),
)
