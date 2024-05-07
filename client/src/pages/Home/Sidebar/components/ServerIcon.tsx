import Icon from "./Icon.tsx"
import { Server } from "../../../../../types.ts"
import useChannelStore from "../../../../api/stores/channelStore.ts"
import useContextMenu from "../../../../hooks/useContextMenu.ts"
import ServerContextMenuContainer from "../../../../shared/components/server/ServerContextMenuContainer.tsx"

const ServerIcon = ({ server }: { server: Server }) => {
  const channelStore = useChannelStore()
  const channels = channelStore.get(server.id)

  const link =
    channels.length !== 0
      ? `/channels/${server.id}/${channels[0].id}`
      : `/channels/${server.id}`

  const contextMenu = useContextMenu()

  return (
    <>
      <Icon
        name={server.name}
        link={link}
        onContextMenu={(e) => contextMenu.open(e)}
      />
      <ServerContextMenuContainer contextMenu={contextMenu} server={server} />
    </>
  )
}

export default ServerIcon
