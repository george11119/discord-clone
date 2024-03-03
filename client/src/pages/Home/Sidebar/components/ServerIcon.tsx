import Icon from "./Icon.tsx"
import { Server } from "../../../../../types.ts"

const ServerIcon = ({ server }: { server: Server }) => {
  return <Icon name={server.name} link={server.id} />
}

export default ServerIcon
