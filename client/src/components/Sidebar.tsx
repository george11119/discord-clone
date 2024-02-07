import styled from "styled-components"
import SidebarIcon from "./SidebarIcon.tsx"

const SidebarWrapper = styled.nav`
  background: rgb(30, 31, 34);
  padding-top: 8px;
  width: 72px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarIcon name={"AAA"} />
      <SidebarIcon name={"BBB"} />
      <SidebarIcon name={"CCC"} />
      <SidebarIcon name={"DDD"} />
    </SidebarWrapper>
  )
}

export default Sidebar
