import Icon from "./Icon.tsx"
import { Server } from "../../../../../types.ts"
import useChannelStore from "../../../../api/stores/channelStore.ts"

const ServerIcon = ({ server }: { server: Server }) => {
  const channelStore = useChannelStore()
  const channels = channelStore.get(server.id)

  const link =
    channels.length !== 0
      ? `/channels/${server.id}/${channels[0].id}`
      : `/channels/${server.id}`

  return <Icon name={server.name} link={link} />
}

export default ServerIcon
