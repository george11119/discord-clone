import MicrophoneButton from "./MicrophoneButton.tsx"
import DeafenButton from "./DeafenButton.tsx"
import SettingsButton from "./SettingsButton.tsx"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"

const UserBarButtons = () => {
  return (
    <>
      <Tooltip tooltip="Mute (Not implemented)" placement="top" fontSize={13}>
        <MicrophoneButton />
      </Tooltip>
      <Tooltip tooltip="Deafen (Not implemented)" placement="top" fontSize={13}>
        <DeafenButton />
      </Tooltip>
      <Tooltip tooltip="User Settings" placement="top" fontSize={13}>
        <SettingsButton />
      </Tooltip>
    </>
  )
}

export default UserBarButtons
