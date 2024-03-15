import MicrophoneButton from "../../../../../shared/svg/MicrophoneButton.tsx"
import DeafenButton from "../../../../../shared/svg/DeafenButton.tsx"
import SettingsButton from "../../../../../shared/svg/SettingsButton.tsx"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"
import UserBarButton from "./UserBarButton.tsx"

const UserBarButtons = () => {
  return (
    <>
      <Tooltip tooltip="Mute (Not implemented)" placement="top" fontSize={13}>
        <UserBarButton>
          <MicrophoneButton />
        </UserBarButton>
      </Tooltip>
      <Tooltip tooltip="Deafen (Not implemented)" placement="top" fontSize={13}>
        <UserBarButton>
          <DeafenButton />
        </UserBarButton>
      </Tooltip>
      <Tooltip tooltip="User Settings" placement="top" fontSize={13}>
        <UserBarButton>
          <SettingsButton size={20} />
        </UserBarButton>
      </Tooltip>
    </>
  )
}

export default UserBarButtons
