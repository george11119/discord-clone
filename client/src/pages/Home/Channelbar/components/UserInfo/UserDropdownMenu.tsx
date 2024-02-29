import { useContext } from "react"
import AuthContext from "../../../../Auth/AuthContext.ts"
import styled from "styled-components"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"

const UserProfilePicture = styled.svg`
  height: 32px;
  width: 32px;
  flex: 0 0 auto;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px 4px 0;
  line-height: 16px;
  margin-right: 4px;

  &:hover {
    background-color: rgba(78, 80, 88, 0.6);
  }
`

const UsernameDisplay = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 400;
  flex: 1 1 auto;
  padding: 4px 0 4px 8px;
  width: 76px;
`

const StatusDisplay = styled.div`
  color: rgb(181, 186, 193);
  font-size: 11px;
`

const UserDropdownMenu = () => {
  const { user } = useContext(AuthContext)

  return (
    <Tooltip tooltip={JSON.stringify(user)} placement="top">
      <Wrapper>
        <UserProfilePicture>
          <circle cx="16" cy="16" r="16" fill="red{/*rgb(49, 51, 56)*/}" />
        </UserProfilePicture>
        <UsernameDisplay>
          <div>{user?.username}</div>
          <StatusDisplay>Online</StatusDisplay>
        </UsernameDisplay>
      </Wrapper>
    </Tooltip>
  )
}

export default UserDropdownMenu
