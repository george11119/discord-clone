import { User } from "../../../../../../types.ts"
import UserProfilePicture from "../../../../../shared/components/UserProfilePicture.tsx"
import MessageIcon from "../../../../../shared/svg/MessageIcon.tsx"
import MoreIcon from "../../../../../shared/svg/MoreIcon.tsx"
import { CSSProperties, ReactNode, useState } from "react"
import styled from "styled-components"
import CloseIcon from "../../../../../shared/svg/CloseIcon.tsx"
import CheckmarkIcon from "../../../../../shared/svg/CheckmarkIcon.tsx"
import userQueries from "../../../../../api/queries/userQueries.ts"

const PeopleListItemWrapper = styled.div`
  cursor: pointer;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  border-radius: 6px;
  margin-left: 20px;
  margin-right: 10px;

  &:hover {
    background-color: #393c41;
  }
`

const TopBorder = styled.div`
  margin-left: 30px;
  margin-right: 20px;
  border-top: 0.67px solid rgba(78, 80, 88, 0.48);
`

const UserProfilePictureContainer = styled.div`
  margin-right: 12px;
`

const UsernameContainer = styled.div`
  height: 40px;
  line-height: 20px;
`

const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
  height: 20px;
`

const InfoText = styled.div`
  height: 20px;
  color: rgb(181, 186, 193);
  font-size: 12px;
`

const PeopleListItemButtons = styled.div`
  display: flex;
  gap: 10px;
`

const PeopleListItemButtonWrapper = styled.div<{ $hoverColor?: string }>`
  cursor: pointer;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2d31;
  border-radius: 50%;
  color: #b5bac1;

  &:hover {
    color: ${(props) => (props.$hoverColor ? props.$hoverColor : "#eeeeee")};
  }
`

const PeopleListItemButton = ({
  icon,
  onClick,
  hoverColor,
}: {
  icon: ReactNode
  onClick: () => void
  hoverColor?: string
}) => {
  const [clicked, setClicked] = useState(false)
  const clickedStyle: CSSProperties = {
    color: "white",
    backgroundColor: "#3e4046",
  }

  return (
    <PeopleListItemButtonWrapper
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      style={clicked ? clickedStyle : {}}
      onClick={onClick}
      $hoverColor={hoverColor}
    >
      {icon}
    </PeopleListItemButtonWrapper>
  )
}

const PeopleListItem = ({
  user,
  type,
}: {
  user: User
  type: "friend" | "sent" | "received"
}) => {
  const destroyFriendRequestMutation = userQueries.useDestroyFriendRequest(
    user.id,
  )
  const acceptFriendRequestMutation = userQueries.useAcceptFriendRequest(
    user.id,
  )
  const destroyFriendshipMutation = userQueries.useDestroyFriendship(
    user.id
  )

  const handleFriendRequestDestroy = () => {
    destroyFriendRequestMutation.mutate(user.username)
  }

  const handleFriendRequestAccept = () => {
    acceptFriendRequestMutation.mutate(user.username)
  }

  const handleFriendshipDestroy = () => {
    destroyFriendshipMutation.mutate(user.id)
  }

  return (
    <>
      <TopBorder />
      <PeopleListItemWrapper>
        <div style={{ display: "flex" }}>
          <UserProfilePictureContainer>
            <UserProfilePicture profileDiameter={32} user={user} />
          </UserProfilePictureContainer>
          <UsernameContainer>
            <Username>{user.username}</Username>
            <InfoText>Online</InfoText>
          </UsernameContainer>
        </div>
        <PeopleListItemButtons>
          {type === "friend" && (
            <>
              <PeopleListItemButton
                icon={<MessageIcon size={20} />}
                onClick={() => null}
              />
              <PeopleListItemButton
                icon={<MoreIcon size={20} />}
                onClick={() => null}
              />
              <PeopleListItemButton
                icon={
                  <CloseIcon
                    size={20}
                    fill={"currentColor"}
                    hoverColor={"#f23f42"}
                  />
                }
                onClick={handleFriendshipDestroy}
                hoverColor={"#f23f42"}
              />
            </>
          )}

          {type === "sent" && (
            <PeopleListItemButton
              icon={
                <CloseIcon
                  size={20}
                  fill={"currentColor"}
                  hoverColor={"#f23f42"}
                />
              }
              onClick={handleFriendRequestDestroy}
              hoverColor={"#f23f42"}
            />
          )}

          {type === "received" && (
            <>
              <PeopleListItemButton
                icon={<CheckmarkIcon size={20} />}
                onClick={handleFriendRequestAccept}
                hoverColor={"rgb(35, 165, 89)"}
              />
              <PeopleListItemButton
                icon={
                  <CloseIcon
                    size={20}
                    fill={"currentColor"}
                    hoverColor={"#f23f42"}
                  />
                }
                onClick={handleFriendRequestDestroy}
                hoverColor={"#f23f42"}
              />
            </>
          )}
        </PeopleListItemButtons>
      </PeopleListItemWrapper>
    </>
  )
}

export default PeopleListItem
