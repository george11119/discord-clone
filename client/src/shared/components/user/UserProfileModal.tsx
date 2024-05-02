import Modal from "../Modal.tsx"
import styled from "styled-components"
import { stringToColor } from "../../../utils/stringToColor.ts"
import { User } from "../../../../types.ts"
import UserProfilePicture from "../UserProfilePicture.tsx"
import VerticalSpacer from "../VerticalSpacer.tsx"
import Separator from "../../../pages/Home/Sidebar/components/Separator.tsx"
import { dateFormatter } from "../../../utils/dateTime.ts"
import Button from "../Button.tsx"
import useFriendsStore from "../../../api/stores/friendsStore.ts"
import useDirectMessagesStore from "../../../api/stores/directMessageStore.ts"
import { useNavigate } from "react-router-dom"
import userQueries from "../../../api/queries/userQueries.ts"
import directMessagesQueries from "../../../api/queries/directMessagesQueries.ts"
import { useContext } from "react"
import AuthContext from "../../../pages/Auth/AuthContext.ts"

const Wrapper = styled.div`
  width: 600px;
  height: 580px;
  background-color: rgb(35, 36, 40);
  border-radius: 8px;
  line-height: 20px;
`

const Banner = styled.div<{ $backgroundColor?: string }>`
  height: 106px;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "#242428"};
  border-radius: 8px 8px 0 0;
`

const ProfilePictureBorder = styled.div`
  height: 144px;
  width: 144px;
  position: absolute;
  left: 20px;
  top: 28px;
  border-radius: 50%;
  background-color: rgb(35, 36, 40);
`

const ProfilePictureContainer = styled.div`
  position: absolute;
  top: 11px;
  left: 11px;
`

const ButtonWrapper = styled.div`
  height: 75px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  justify-content: end;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 356px;
  margin: 0px 16px 16px 16px;
  border-radius: 8px;
  background-color: rgb(17, 18, 20);
  padding: 12px;
  max-height: 700px;
`

const BoldText = styled.div`
  font-weight: 600;
`

const UserProfileModal = ({
  user,
  handleClose,
}: {
  handleClose: () => void
  user: User
}) => {
  const { user: selfUser } = useContext(AuthContext)
  const friendsStore = useFriendsStore()
  const directMessagesStore = useDirectMessagesStore()
  const navigate = useNavigate()

  const isFriend = friendsStore.get().some((u) => u.id === user.id)

  const createFriendRequestMutation = userQueries.useCreateFriendRequest()
  const destroyFriendshipMutation = userQueries.useDestroyFriendship(user.id)
  const createDirectMessageMutation =
    directMessagesQueries.useCreateDirectMessages()

  const addFriendAction = () => {
    createFriendRequestMutation.mutate(user.username)
    handleClose()
  }

  const removeFriendAction = () => {
    destroyFriendshipMutation.mutate(user.id)
    handleClose()
  }

  const directMessageCreateAction = () => {
    const directMessages = directMessagesStore.get()
    const directMessage = directMessages.find(
      (dm) => dm.recepient?.id === user.id,
    )

    if (directMessage) {
      navigate(`/channels/@me/${directMessage.channel?.id}`)
      return
    }

    createDirectMessageMutation.mutate(user)
  }

  return (
    <Modal handleClose={handleClose} style={{ borderRadius: 8 }}>
      <Wrapper>
        <Banner $backgroundColor={stringToColor(user.username as string)} />
        <ProfilePictureBorder>
          <ProfilePictureContainer>
            <UserProfilePicture profileDiameter={120} user={user} />
          </ProfilePictureContainer>
        </ProfilePictureBorder>
        <ButtonWrapper>
          {user.id !== selfUser?.id && (
            <>
              <Button
                text={isFriend ? "Remove Friend" : "Send Friend Request"}
                style={{
                  fontSize: 13,
                  marginTop: 0,
                  padding: "2px 16px",
                  height: 32,
                  marginLeft: 12,
                  backgroundColor: isFriend ? "#f23f42" : "#248046",
                }}
                onClick={isFriend ? removeFriendAction : addFriendAction}
              />
              <Button
                text="Send Message"
                style={{
                  fontSize: 13,
                  marginTop: 0,
                  padding: "2px 16px",
                  height: 32,
                  marginLeft: 12,
                  backgroundColor: "#248046",
                }}
                onClick={directMessageCreateAction}
              />
            </>
          )}
        </ButtonWrapper>
        <InnerWrapper>
          <VerticalSpacer height={12} />
          <BoldText>{user?.username}</BoldText>
          <VerticalSpacer height={12} />
          <Separator type="thick" width={"auto"} />
          <VerticalSpacer height={12} />

          <div style={{ fontSize: "12px" }}>
            <BoldText style={{ marginBottom: "6px" }}>
              DISCORD MEMBER SINCE
            </BoldText>
            {dateFormatter(user?.createdAt as Date, "MMMM d, yyyy")}
          </div>
        </InnerWrapper>
      </Wrapper>
    </Modal>
  )
}

export default UserProfileModal
