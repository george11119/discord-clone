import styled from "styled-components"

const SidebarWrapper = styled.div`
  background: grey;
  padding-top: 8px;
  width: 72px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const SidebarIconWrapper = styled.div`
  height: 48px;
  width: 48px;
  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

const SidebarIcon = ({ name }: { name: string }) => {
  return (
    <SidebarIconWrapper>
      <div>{name}</div>
    </SidebarIconWrapper>
  )
}

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarIcon name={"A"} />
      <SidebarIcon name={"B"} />
      <SidebarIcon name={"C"} />
      <SidebarIcon name={"D"} />
    </SidebarWrapper>
  )
}

export default Sidebar
