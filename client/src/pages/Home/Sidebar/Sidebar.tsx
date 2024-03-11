import styled from "styled-components"
import Separator from "./components/Separator.tsx"
import VerticalSpacer from "../../../shared/components/VerticalSpacer.tsx"
import { useContext, useEffect, useState } from "react"
import ServerService from "../../../services/serverService.ts"
import { Server } from "../../../../types.ts"
import HomeIcon from "./components/HomeIcon.tsx"
import ServerIcon from "./components/ServerIcon.tsx"
import CreateServerButton from "./components/CreateServerButton.tsx"
import AuthContext from "../../Auth/AuthContext.ts"
import serverService from "../../../services/serverService.ts"

const Wrapper = styled.nav`
  background: rgb(30, 31, 34);
  width: 72px;
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

const Sidebar = () => {
  const { token } = useContext(AuthContext)
  const [servers, setServers] = useState<Server[]>([])

  const createServer = async (serverObject: { name: string }) => {
    const server = await serverService.create(serverObject, token as string)
    setServers(servers.concat(server))
  }

  useEffect(() => {
    ServerService.get(token as string).then((servers) => {
      setServers(servers)
    })
  }, [])

  return (
    <Wrapper>
      <HomeIcon />
      <Separator />
      {servers.map((server) => {
        return <ServerIcon key={server.id} server={server} />
      })}
      <CreateServerButton createServer={createServer} />
      <VerticalSpacer height={12} />
    </Wrapper>
  )
}

export default Sidebar
