import styled from "styled-components"
import { User } from "../../../../../../types.ts"
import { stringToColor } from "../../../../../utils/stringToColor.ts"
import UserProfilePicture from "../../../../../shared/components/UserProfilePicture.tsx"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import Separator from "../../../Sidebar/components/Separator.tsx"
import { dateFormatter } from "../../../../../utils/dateTime.ts"

const Wrapper = styled.div`
  width: 340px;
  flex-shrink: 0;
  background-color: #232428;
  position: relative;

  @media (max-width: 1133px) {
    display: none;
  }
`

const Banner = styled.div<{ $backgroundColor?: string }>`
  height: 120px;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "#242428"};
`

const ProfilePictureBorder = styled.div`
  height: 92px;
  width: 92px;
  position: absolute;
  left: 18px;
  top: 72px;
  border-radius: 50%;
  background-color: rgb(35, 36, 40);
`

const ProfilePictureContainer = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
`

const InnerWrapper = styled.div`
  line-height: 16px;
  display: flex;
  flex-direction: column;
  margin: 58px 16px 16px 16px;
  border-radius: 8px;
  background-color: rgb(17, 18, 20);
  padding: 12px;
  max-height: 700px;
`

const BoldText = styled.div`
  font-weight: 600;
`

const NoteContainer = styled.div`
  font-size: 11px;
  padding: 4px;
  height: 28px;
  max-height: 88px;
  line-height: 14px;
`

const ProfilePanel = ({ user }: { user: User | undefined }) => {
  return (
    <Wrapper>
      <Banner $backgroundColor={stringToColor(user?.username as string)} />
      <ProfilePictureBorder>
        <ProfilePictureContainer>
          <UserProfilePicture profileDiameter={80} user={user as User} />
        </ProfilePictureContainer>
      </ProfilePictureBorder>
      <InnerWrapper>
        <BoldText>{user?.username}</BoldText>

        <VerticalSpacer height={12} />
        <Separator type="thick" width={"auto"} />
        <VerticalSpacer height={12} />

        <div style={{ fontSize: "12px", height: 40 }}>
          <BoldText style={{ marginBottom: "6px" }}>
            DISCORD MEMBER SINCE
          </BoldText>
          {dateFormatter(user?.createdAt as Date, "MMMM d, yyyy")}
        </div>

        <VerticalSpacer height={12} />
        <Separator type="thick" width={"auto"} />
        <VerticalSpacer height={12} />

        <div style={{ fontSize: "12px" }}>
          <BoldText style={{ marginBottom: "6px" }}>NOTE</BoldText>
          <NoteContainer>note</NoteContainer>
        </div>
      </InnerWrapper>
    </Wrapper>
  )
}

export default ProfilePanel
