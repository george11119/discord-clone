import { ContextMenuObject } from "../../../../hooks/useContextMenu.ts"
import ContextMenu from "../ContextMenu.tsx"
import { User } from "../../../../../types.ts"
import ContextMenuButton from "../ContextMenuButton.tsx"
import ContextMenuSeparator from "../ContextMenuSeparator.tsx"
import IDIcon from "../../../svg/IDIcon.tsx"
import userQueries from "../../../../api/queries/userQueries.ts"
import useFriendsStore from "../../../../api/stores/friendsStore.ts"
import useDirectMessagesStore from "../../../../api/stores/directMessageStore.ts"
import { useNavigate } from "react-router-dom"
import directMessagesQueries from "../../../../api/queries/directMessagesQueries.ts"

const UserContextMenu = ({
  user,
  contextMenuState,
  close,
}: {
  user: User
  contextMenuState: ContextMenuObject
  close: () => void
}) => {
  const friendsStore = useFriendsStore()
  const directMessagesStore = useDirectMessagesStore()
  const navigate = useNavigate()

  const isFriend = friendsStore.get().some((u) => u.id === user.id)

  const createFriendRequestMutation = userQueries.useCreateFriendRequest()
  const destroyFriendshipMutation = userQueries.useDestroyFriendship(user.id)
  const createDirectMessageMutation =
    directMessagesQueries.useCreateDirectMessages()

  const copyTextToClipboard = async () => {
    await navigator.clipboard.writeText(user.id)
    close()
  }

  const addFriendAction = () => {
    createFriendRequestMutation.mutate(user.username)
    close()
  }

  const removeFriendAction = () => {
    destroyFriendshipMutation.mutate(user.id)
    close()
  }

  const directMessageCreateAction = () => {
    const directMessages = directMessagesStore.get()
    const directMessage = directMessages.find(
      (dm) => dm.recepient?.id === user.id,
    )

    if (directMessage) {
      navigate(`/channels/@me/${directMessage.channel?.id}`)
      return
    }

    createDirectMessageMutation.mutate(user)
  }

  return (
    <ContextMenu contextMenuState={contextMenuState} close={close}>
      <ContextMenuButton text="Profile" onClick={() => null} />
      <ContextMenuButton text="Message" onClick={directMessageCreateAction} />
      <ContextMenuSeparator />
      {isFriend ? (
        <ContextMenuButton text="Remove Friend" onClick={removeFriendAction} />
      ) : (
        <ContextMenuButton text="Add Friend" onClick={addFriendAction} />
      )}
      <ContextMenuSeparator />
      <ContextMenuButton
        text="Copy User ID"
        onClick={copyTextToClipboard}
        icon={<IDIcon size={24} />}
      />
    </ContextMenu>
  )
}

export default UserContextMenu
