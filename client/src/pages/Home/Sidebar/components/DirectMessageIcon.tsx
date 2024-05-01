import { DirectMessage } from "../../../../../types.ts"
import Icon from "./Icon.tsx"
import NumberBadge from "../../../../shared/components/NumberBadge.tsx"
import DiscordIcon from "../../../Auth/assets/DiscordIcon.tsx"
import { stringToColor } from "../../../../utils/stringToColor.ts"

const DirectMessageIcon = ({
  directMessage,
}: {
  directMessage: DirectMessage
}) => {
  const notificationCount =
    directMessage.channel!.messageCount - directMessage.seenMessagesCount

  return (
    <Icon
      name={`${directMessage.recepient?.username}`}
      link={`/channels/@me/${directMessage.channel?.id}`}
      badge={<NumberBadge count={notificationCount} />}
      color={stringToColor(directMessage.recepient?.username as string)}
      hoverColor={stringToColor(directMessage.recepient?.username as string)}
      icon={<DiscordIcon size={28} />}
      canBeActive={"no"}
    />
  )
}

export default DirectMessageIcon
