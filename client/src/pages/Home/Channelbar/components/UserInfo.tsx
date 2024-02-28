import styled from "styled-components"
import UserDropdownMenu from "./UserDropdownMenu.tsx"

const Wrapper = styled.div`
  background-color: rgb(35, 36, 40);
  height: 53px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0 8px;
`

const UserInfo = () => {
  return (
    <Wrapper>
      <UserDropdownMenu />
    </Wrapper>
  )
}

export default UserInfo
