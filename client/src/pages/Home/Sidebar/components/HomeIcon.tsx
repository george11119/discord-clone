import Icon from "./Icon.tsx"
import Logo from "../../../../shared/svg/Logo.tsx"
import NumberBadge from "../../../../shared/components/NumberBadge.tsx"
import useFriendRequestStore from "../../../../api/stores/friendRequestsStore.ts"
import { lastHomepageUrl } from "../../../../utils/storeLastHomepageUrl.ts"

const HomeIcon = () => {
  const friendRequestStore = useFriendRequestStore()
  const receivedFriendRequestsCount = friendRequestStore
    .getAll()
    .filter((fr) => fr.type === "received").length

  const notificationsCount = receivedFriendRequestsCount
  const link =
    lastHomepageUrl === ""
      ? "/channels/@me"
      : `/channels/@me/${lastHomepageUrl}`

  return (
    <Icon
      name="Direct Messages"
      link={link}
      icon={<Logo />}
      badge={
        notificationsCount !== 0 && <NumberBadge count={notificationsCount} />
      }
    />
  )
}

export default HomeIcon
