import styled from "styled-components"
import Sidebar from "./Sidebar/Sidebar.tsx"
import Channelbar from "./Channelbar/Channelbar.tsx"
import ChatAreaContainer from "./Chat/ChatAreaContainer.tsx"
import useSocketConnection from "../../api/sockets/useSocketConnection.ts"
import serverQueries from "../../api/queries/serverQueries.ts"

const Wrapper = styled.div`
  display: grid;
  color: rgb(219, 222, 225);
  grid-template-columns: 72px 240px 1fr;
`

const BlankPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e1f22;
`

const Home = () => {
  useSocketConnection()

  const result = serverQueries.useGetServers()

  if (result.isLoading) return <BlankPage />

  const servers = result.data!

  return (
    <Wrapper>
      <Sidebar servers={servers} />
      <Channelbar />
      <ChatAreaContainer />
    </Wrapper>
  )
}

export default Home
