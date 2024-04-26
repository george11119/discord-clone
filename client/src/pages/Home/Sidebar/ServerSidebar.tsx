import styled from "styled-components"
import Separator from "./components/Separator.tsx"
import VerticalSpacer from "../../../shared/components/VerticalSpacer.tsx"
import HomeIcon from "./components/HomeIcon.tsx"
import ServerIcon from "./components/ServerIcon.tsx"
import CreateServerButton from "./components/CreateServerButton.tsx"
import { Server } from "../../../../types.ts"
import serverSocketHandlers from "../../../api/sockets/serverSocketHandlers.ts"

const Wrapper = styled.nav`
  background: rgb(30, 31, 34);
  height: 100vh;
  display: flex;
  box-sizing: border-box; // wtf this
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  flex-shrink: 0;
  overflow-y: scroll;
  scrollbar-width: none;
`

const ServerSidebar = ({ servers }: { servers: Server[] }) => {
  serverSocketHandlers.useServerDeleteListener()
  serverSocketHandlers.useServerEditListener()

  return (
    <Wrapper>
      <HomeIcon />
      <Separator type={"thick"} />
      {servers?.map((server) => {
        return <ServerIcon key={server.id} server={server} />
      })}
      <CreateServerButton />
      <VerticalSpacer height={12} />
    </Wrapper>
  )
}

export default ServerSidebar
