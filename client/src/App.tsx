import Sidebar from "./components/Sidebar/Sidebar.tsx"
import Channelbar from "./components/Channelbar/Channelbar.tsx"
import styled from "styled-components"

const AppWrapper = styled.div`
  display: flex;
`

const App = () => {
  return (
    <AppWrapper>
      <Sidebar />
      <Channelbar />
    </AppWrapper>
  )
}

export default App
