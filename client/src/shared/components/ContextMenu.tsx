import styled from "styled-components"
import { ContextMenuObject } from "../../hooks/useContextMenu.ts"
import useOnOutsideClick from "../../hooks/useOnOutsideClick.ts"
import { useLayoutEffect } from "react"
import Separator from "../../pages/Home/Sidebar/components/Separator.tsx"

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

const ContextMenuButtonWrapper = styled.button`
  padding: 6px 8px;
  height: 32px;
  margin: 2px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(181, 186, 193);
  background-color: #111214;
  border: none;
  font-size: 14px;
  border-radius: 2px;

  &:hover {
    color: white;
    background-color: #5865f2;
  }
`

const ContextMenuButton = ({ text }: { text: string }) => {
  return <ContextMenuButtonWrapper>{text}</ContextMenuButtonWrapper>
}

const ContextMenu = ({
  contextMenuState,
  close,
}: {
  contextMenuState: ContextMenuObject
  close: () => void
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
      <ContextMenuButton text="Profile" />
      <ContextMenuButton text="Mention" />
      <Separator type="thin" style={{ width: 164, margin: 4 }} />
      <ContextMenuButton text="Mute" />
      <ContextMenuButton text="Deafen" />
      <ContextMenuButton text="Role" />
      <Separator type="thin" style={{ width: 164, margin: 4 }} />
      <ContextMenuButton text="Copy User ID" />
    </Wrapper>
  )
}

export default ContextMenu
