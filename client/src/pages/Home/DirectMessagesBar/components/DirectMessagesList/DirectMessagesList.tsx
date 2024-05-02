import { DirectMessage, User } from "../../../../../../types.ts"
import styled from "styled-components"
import UserProfilePicture from "../../../../../shared/components/UserProfilePicture.tsx"
import { Link, matchPath, useLocation } from "react-router-dom"
import { CSSProperties } from "react"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import UserContextMenuContainer from "../../../../../shared/components/user/UserContextMenuContainer.tsx"
import useContextMenu from "../../../../../hooks/useContextMenu.ts"
import useModal from "../../../../../hooks/useModal.ts"

const Wrapper = styled.ul`
  margin-top: 6px;
`

const ListItemWrapper = styled.li`
  height: 42px;
  display: flex;
  align-items: center;
  width: 224px;
  font-size: 15px;
  color: rgb(148, 155, 164);
  border-radius: 4px;
  margin: 1px 0;

  &:hover {
    background-color: #35373c;
    color: rgb(219, 222, 225);
  }
`

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 224px;
`

const UserInfoWrapper = styled.div`
  margin: 0 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const UsernameWrapper = styled.div`
  max-width: 164px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DirectMessagesListItem = ({
  directMessage,
}: {
  directMessage: DirectMessage
}) => {
  const contextMenu = useContextMenu()
  const modal = useModal()
  const { pathname } = useLocation()
  const isActive = matchPath(
    `/channels/@me/${directMessage.channel?.id}/*`,
    pathname,
  )

  const activeStyle: CSSProperties = {
    backgroundColor: "rgba(78, 80, 88, 0.6)",
    color: "#ffffff",
  }

  return (
    <>
      <ListItemWrapper
        style={isActive ? activeStyle : {}}
        onContextMenu={(e) => contextMenu.open(e)}
      >
        <LinkWrapper to={`/channels/@me/${directMessage.channel?.id}`}>
          <UserInfoWrapper>
            <UserProfilePicture
              profileDiameter={32}
              user={directMessage.recepient as User}
            />
            <UsernameWrapper>
              {directMessage.recepient?.username}
            </UsernameWrapper>
          </UserInfoWrapper>
        </LinkWrapper>
      </ListItemWrapper>
      <UserContextMenuContainer
        contextMenu={contextMenu}
        user={directMessage.recepient as User}
        modal={modal}
      />
    </>
  )
}

const DirectMessagesList = ({
  directMessages,
}: {
  directMessages: DirectMessage[]
}) => {
  return (
    <Wrapper>
      {directMessages.map((dm) => {
        return <DirectMessagesListItem key={dm.id} directMessage={dm} />
      })}
      <VerticalSpacer height={96} />
    </Wrapper>
  )
}

export default DirectMessagesList
