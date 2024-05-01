import { useState } from "react"

export type ContextMenuObject = {
  show: boolean
  x: number
  y: number
}

export type ContextMenuOptions = {
  open: (e: any) => void
  close: () => void
  contextMenuState: ContextMenuObject
}

const useContextMenu = (): ContextMenuOptions => {
  const [contextMenuState, setContextMenuState] = useState<ContextMenuObject>({
    show: false,
    x: 0,
    y: 0,
  })

  const open = (e: any) => {
    e.preventDefault()
    const { pageX, pageY } = e
    setContextMenuState({ show: true, x: pageX, y: pageY })
  }

  const close = () => setContextMenuState({ show: false, x: 0, y: 0 })

  return { contextMenuState, open, close }
}

export default useContextMenu
