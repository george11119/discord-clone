import DirectMessagesList from "../Channelbar/components/DirectMessagesList/DirectMessagesList.tsx"
import Sidebar from "../../../shared/components/Sidebar/Sidebar.tsx"
import Header from "./components/Header/Header.tsx"

const DirectMessagesBar = () => {
  return (
    <Sidebar header={<Header />}>
      <DirectMessagesList />
    </Sidebar>
  )
}

export default DirectMessagesBar
