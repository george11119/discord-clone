import styled from "styled-components"
import Separator from "./components/Separator.tsx"
import VerticalSpacer from "../../../shared/components/VerticalSpacer.tsx"
import { useContext } from "react"
import serverService from "../../../services/serverService.ts"
import HomeIcon from "./components/HomeIcon.tsx"
import ServerIcon from "./components/ServerIcon.tsx"
import CreateServerButton from "./components/CreateServerButton.tsx"
import AuthContext from "../../Auth/AuthContext.ts"
import { useQuery } from "@tanstack/react-query"

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

  const result = useQuery({
    queryKey: ["servers"],
    queryFn: () => serverService.get(token as string),
  })

  if (result.isLoading) {
    return <Wrapper></Wrapper>
  }

  const servers = result.data

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
