import Icon from "./Icon.tsx"
import Logo from "../../../../shared/svg/Logo.tsx"
import NumberBadge from "../../../../shared/components/NumberBadge.tsx"
import useFriendRequestStore from "../../../../api/stores/friendRequestsStore.ts"

const HomeIcon = () => {
  const friendRequestStore = useFriendRequestStore()
  const receivedFriendRequestsCount = friendRequestStore
    .getAll()
    .filter((fr) => fr.type === "received").length

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
