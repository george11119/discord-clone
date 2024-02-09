import styled from "styled-components"
import Sidebar from "./components/Sidebar/Sidebar.tsx"
import Channelbar from "./components/Channelbar/Channelbar.tsx"
import ChatAreaContainer from "./components/Chat/ChatAreaContainer.tsx"

const Wrapper = styled.div`
  display: flex;
`

const App = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Channelbar />
      <ChatAreaContainer />
    </Wrapper>
  )
}

export default App
