import Searchbar from "../../../../../shared/components/Header/Searchbar.tsx"
import IconButton from "../../../../../shared/components/IconButton.tsx"
import InboxIcon from "../../../../../shared/svg/InboxIcon.tsx"
import HelpIcon from "../../../../../shared/svg/HelpIcon.tsx"
import UserProfileIcon from "../../../../../shared/svg/UserProfileIcon.tsx"
import VideoCallIcon from "../../../../../shared/svg/VideoCallIcon.tsx"
import VoiceCallIcon from "../../../../../shared/svg/VoiceCallIcon.tsx"
import PinnedMessagesIcon from "../../../../../shared/svg/PinnedMessagesIcon.tsx"
import AddFriendIcon from "../../../../../shared/svg/AddFriendIcon.tsx"

const HeaderButtons = ({
  profilePanel,
}: {
  profilePanel: {
    profilePanelShown: boolean
    setProfilePanelShown: (x: boolean) => void
  }
}) => {
  const { profilePanelShown, setProfilePanelShown } = profilePanel

  return (
    <>
      {/*voice call icon*/}
      <IconButton>
        <VoiceCallIcon size={24} />
      </IconButton>

      {/*video call icon*/}
      <IconButton>
        <VideoCallIcon size={24} />
      </IconButton>

      {/*Pinned messages*/}
      <IconButton>
        <PinnedMessagesIcon size={24} />
      </IconButton>

      {/*Pinned messages*/}
      <IconButton>
        <AddFriendIcon size={24} />
      </IconButton>

      {/*user profile panel icon*/}
      <IconButton
        tooltip={`${profilePanelShown ? "Hide" : "Show"} User Profile`}
        onClick={() => {
          const val = profilePanelShown ? "hide" : "show"
          localStorage.setItem("discord-clone-profile-panel-shown", val)
          setProfilePanelShown(!profilePanelShown)
        }}
      >
        <UserProfileIcon
          size={24}
          color={profilePanelShown ? "rgb(229, 232, 235)" : "currentColor"}
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
