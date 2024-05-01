import styled from "styled-components"
import { ContextMenuObject } from "../../../hooks/useContextMenu.ts"
import useOnOutsideClick from "../../../hooks/useOnOutsideClick.ts"
import { ReactNode, useLayoutEffect } from "react"

const Wrapper = styled.div`
  position: fixed;
  width: 172px;
  padding: 6px 8px;
  background-color: #111214;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 8px 16px 0px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`

const ContextMenu = ({
  children,
  contextMenuState,
  close,
}: {
  contextMenuState: ContextMenuObject
  close: () => void
  children: ReactNode
}) => {
  const ref = useOnOutsideClick(() => close(), 0)

  useLayoutEffect(() => {
    function handleResize() {
      close()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Wrapper
      ref={ref}
      style={{ top: contextMenuState.y, left: contextMenuState.x }}
    >
      {children}
    </Wrapper>
  )
}

export default ContextMenu
