import styled from "styled-components"
import Sidebar from "./components/Sidebar/Sidebar.tsx"
import Channelbar from "./components/Channelbar/Channelbar.tsx"
import Chat from "./components/Chat/Chat.tsx"

const Wrapper = styled.div`
  display: flex;
`

const App = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Channelbar />
      <Chat />
    </Wrapper>
  )
}

export default App
