import styled from "styled-components"
import UserDropdownMenu from "./UserDropdownMenu.tsx"
import UserBarButtons from "./UserBarButtons.tsx"

const Wrapper = styled.div`
  background-color: rgb(35, 36, 40);
  height: 53px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0 8px;
`

const UserBar = () => {
  return (
    <Wrapper>
      <UserDropdownMenu />
      <UserBarButtons />
    </Wrapper>
  )
}

export default UserBar
