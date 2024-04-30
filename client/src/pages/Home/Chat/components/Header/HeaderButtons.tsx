import HelpIcon from "../../../../../shared/svg/HelpIcon.tsx"
import InboxIcon from "../../../../../shared/svg/InboxIcon.tsx"
import MemberListIcon from "../../../../../shared/svg/MemberListIcon.tsx"
import PinnedMessagesIcon from "../../../../../shared/svg/PinnedMessagesIcon.tsx"
import NotificationsIcon from "../../../../../shared/svg/NotificationsIcon.tsx"
import ThreadsIcon from "../../../../../shared/svg/ThreadsIcon.tsx"
import IconButton from "../../../../../shared/components/IconButton.tsx"
import Searchbar from "../../../../../shared/components/Header/Searchbar.tsx"

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
        onClick={() => {
          const val = userList.userListShown ? "hide" : "show"
          localStorage.setItem("discord-clone-userlist-shown", val)
          userList.setUserListShown(!userList.userListShown)
        }}
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
