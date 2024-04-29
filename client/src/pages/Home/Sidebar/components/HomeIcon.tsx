import Icon from "./Icon.tsx"
import Logo from "../../../../shared/svg/Logo.tsx"
import NumberBadge from "../../../../shared/components/NumberBadge.tsx"
import { useQueryClient } from "@tanstack/react-query"
import { FriendRequestItem } from "../../../../../types.ts"

const HomeIcon = () => {
  const queryClient = useQueryClient()
  const friendRequests = queryClient.getQueryData([
    "friendRequests",
  ]) as FriendRequestItem[]
  const receivedFriendRequestsCount = friendRequests.filter(
    (fr) => fr.type === "received",
  ).length

  const notificationsCount = receivedFriendRequestsCount

  return (
    <Icon
      name="Direct Messages"
      link="/channels/@me"
      icon={<Logo />}
      badge={
        notificationsCount !== 0 && <NumberBadge count={notificationsCount} />
      }
    />
  )
}

export default HomeIcon
