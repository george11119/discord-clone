import Icon from "./Icon.tsx"
import { Server } from "../../../../../types.ts"
import { useQueryClient } from "@tanstack/react-query"

const ServerIcon = ({ server }: { server: Server }) => {
  const queryClient = useQueryClient()
  return (
    <div onClick={() => queryClient.removeQueries({ queryKey: ["channels"] })}>
    <Icon name={server.name} link={`/channels/${server.id}`} />
    </div>
  )
}

export default ServerIcon
