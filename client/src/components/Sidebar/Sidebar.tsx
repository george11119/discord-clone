import styled from "styled-components"
import SidebarIcon from "./SidebarIcon.tsx"

const SidebarWrapper = styled.nav`
  background: rgb(30, 31, 34);
  width: 72px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  flex-shrink: 0;
`

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarIcon name={"group chat 1"} />
      <SidebarIcon name={"group chat 2"} />
      <SidebarIcon name={"league server"} />
      <SidebarIcon name={"homework server"} />
    </SidebarWrapper>
  )
}

export default Sidebar
