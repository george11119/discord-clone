import Icon from "./Icon.tsx"
import { Channel, Server } from "../../../../../types.ts"
import { useQueryClient } from "@tanstack/react-query"

const ServerIcon = ({ server }: { server: Server }) => {
  const queryClient = useQueryClient()
  const channels = queryClient.getQueryData([
    "channels",
    `${server.id}`,
  ]) as Channel[]

  const link =
    channels.length !== 0
      ? `/channels/${server.id}/${channels[0].id}`
      : `/channels/${server.id}`

  return <Icon name={server.name} link={link} />
}

export default ServerIcon
