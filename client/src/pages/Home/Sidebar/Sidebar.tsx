import styled from "styled-components"
import Icon from "./components/Icon.tsx"
import Separator from "./components/Separator.tsx"
import VerticalSpacer from "../../../shared/components/VerticalSpacer.tsx"
import { useEffect, useState } from "react"
import ServerService from "../../../services/serverService.ts"
import { Server } from "../../../../types.ts"
import HomeIcon from "./components/HomeIcon.tsx"
import ServerIcon from "./components/ServerIcon.tsx"

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
  const [servers, setServers] = useState<Server[]>([])

  useEffect(() => {
    ServerService.get().then((servers) => {
      setServers(servers)
    })
  }, [])

  return (
    <Wrapper>
      <HomeIcon />
      <Separator />
      {servers.map((server) => {
        return <ServerIcon server={server} />
      })}
      <VerticalSpacer height={12} />
    </Wrapper>
  )
}

export default Sidebar
