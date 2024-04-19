import { ReactNode } from "react"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"
import styled from "styled-components"
import SearchIcon from "../../../../../shared/svg/SearchIcon.tsx"
import HelpIcon from "../../../../../shared/svg/HelpIcon.tsx"
import InboxIcon from "../../../../../shared/svg/InboxIcon.tsx"
import MemberListIcon from "../../../../../shared/svg/MemberListIcon.tsx"
import PinnedMessagesIcon from "../../../../../shared/svg/PinnedMessagesIcon.tsx"
import NotificationsIcon from "../../../../../shared/svg/NotificationsIcon.tsx"
import ThreadsIcon from "../../../../../shared/svg/ThreadsIcon.tsx"

const SearchbarWrapper = styled.div`
  height: 24px;
  width: 144px;
  margin: 0px 8px;
  background-color: #1e1f22;
  border-radius: 4px;
  font-weight: 400;
  font-size: 13px;
  color: rgb(148, 155, 164);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Searchbar = () => {
  return (
    <SearchbarWrapper>
      <div style={{ padding: 6 }}>Search</div>
      <div
        style={{
          padding: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon size={16} />
      </div>
    </SearchbarWrapper>
  )
}

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 8px;
  color: "#b5bac1";
`

const IconWrapper = styled.div`
  cursor: pointer;
  color: #b5bac1;

  &:hover {
    color: rgb(229, 232, 235);
  }
`

const IconButton = ({
  children,
  onClick,
  tooltip,
}: {
  children: ReactNode
  onClick?: () => void
  tooltip?: string
}) => {
  return (
    <IconContainer>
      <Tooltip tooltip={tooltip ? tooltip : ""} placement="bottom">
        <IconWrapper onClick={onClick}>{children}</IconWrapper>
      </Tooltip>
    </IconContainer>
  )
}

const HeaderButtons = ({
  userList,
}: {
  userList: {
    userListShown: boolean
    setUserListShown: (x: boolean) => void
  }
}) => {
  return (
    <>
      {/*Threads icon*/}
      <IconButton>
        <ThreadsIcon size={24} />
      </IconButton>

      {/*Notifications icon*/}
      <IconButton>
        <NotificationsIcon size={24} />
      </IconButton>

      {/*Pinned messages*/}
      <IconButton>
        <PinnedMessagesIcon size={24} />
      </IconButton>

      {/*User list*/}
      <IconButton
        tooltip={`${userList.userListShown ? "Hide" : "Show"} User list`}
        onClick={() => userList.setUserListShown(!userList.userListShown)}
      >
        <MemberListIcon
          size={24}
          color={userList.userListShown ? "rgb(229, 232, 235)" : "currentColor"}
        />
      </IconButton>

      {/*search bar*/}
      <Searchbar />

      {/*inbox button*/}
      <IconButton>
        <InboxIcon size={24} />
      </IconButton>

      {/*Help button*/}
      <IconButton>
        <HelpIcon size={24} />
      </IconButton>
    </>
  )
}

export default HeaderButtons