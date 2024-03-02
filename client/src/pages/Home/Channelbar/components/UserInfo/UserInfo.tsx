import { useContext, useState } from "react"
import AuthContext from "../../../../Auth/AuthContext.ts"
import styled from "styled-components"
import UserProfilePopout from "./UserProfilePopout.tsx"
import UserProfilePicture from "../../../../../shared/components/UserProfilePicture.tsx"

const ProfilePictureContainer = styled.div`
  flex: 0 0 auto;
`

const Wrapper = styled.div`
  position: relative;
`

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 1px 4px 1px 0;
  line-height: 16px;

  &:hover {
    background-color: rgba(78, 80, 88, 0.6);
  }
`

const InfoDisplay = styled.div`
  font-weight: 400;
  flex: 1 1 auto;
  padding: 4px 0 4px 8px;
`

const Username = styled.div`
  font-size: 13px;
  max-width: 76px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Status = styled.div`
  color: rgb(181, 186, 193);
  font-size: 11px;
  max-width: 76px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
`

const UserInfo = () => {
  const [popoutOpen, setPopoutOpen] = useState(false)
  const { user } = useContext(AuthContext)

  const togglePopoutVisibility = (e: any) => {
    e.stopPropagation()
    setPopoutOpen(!popoutOpen)
  }

  return (
    <Wrapper>
      {popoutOpen && <UserProfilePopout setPopoutOpen={setPopoutOpen} />}
      <UserInfoWrapper onClick={togglePopoutVisibility}>
        <ProfilePictureContainer>
          <UserProfilePicture profileDiameter={32} />
        </ProfilePictureContainer>
        <InfoDisplay>
          <Username>{user?.username}</Username>
          <Status>Online</Status>
        </InfoDisplay>
      </UserInfoWrapper>
    </Wrapper>
  )
}

export default UserInfo
