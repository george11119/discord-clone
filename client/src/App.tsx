import styled from "styled-components"
import Sidebar from "./components/Sidebar/Sidebar.tsx"
import Channelbar from "./components/Channelbar/Channelbar.tsx"
import ChatContainer from "./components/Chat/ChatContainer.tsx"

const AppWrapper = styled.div`
  display: flex;
`

const App = () => {
  return (
    <AppWrapper>
      <Sidebar />
      <Channelbar />
      <ChatContainer />
    </AppWrapper>
  )
}

export default App
