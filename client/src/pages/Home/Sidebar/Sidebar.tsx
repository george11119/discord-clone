import styled from "styled-components"
import Separator from "./components/Separator.tsx"
import VerticalSpacer from "../../../shared/components/VerticalSpacer.tsx"
import HomeIcon from "./components/HomeIcon.tsx"
import ServerIcon from "./components/ServerIcon.tsx"
import CreateServerButton from "./components/CreateServerButton.tsx"
import { useQueryClient } from "@tanstack/react-query"
import { Server } from "../../../../types.ts"
import { useEffect } from "react"
import { socket } from "../../../config/socket.ts"

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

const Sidebar = ({ servers }: { servers: Server[] }) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const onServerDelete = (serverId: string) => {
      const oldServers = queryClient.getQueryData(["servers"]) as Server[]
      const newServers = oldServers.filter((s) => s.id !== serverId)

      queryClient.setQueryData(["servers"], newServers)
    }

    socket.on("server:delete", onServerDelete)

    return () => {
      socket.off("server:delete", onServerDelete)
    }
  }, [])

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

export default Sidebar
