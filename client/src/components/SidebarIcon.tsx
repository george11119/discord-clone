import styled from "styled-components"

const SidebarIconWrapper = styled.div`
  height: 48px;
  width: 48px;
  background: rgb(49, 51, 56);
  color: rgb(219, 222, 225);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 500;
  font-size: 18px;
`

const SidebarIcon = ({ name }: { name: string }) => {
  return (
    <SidebarIconWrapper>
      <div>{name}</div>
    </SidebarIconWrapper>
  )
}

export default SidebarIcon
