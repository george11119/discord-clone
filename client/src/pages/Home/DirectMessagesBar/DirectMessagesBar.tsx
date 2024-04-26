import DirectMessagesList from "../Channelbar/components/DirectMessagesList/DirectMessagesList.tsx"
import Sidebar from "../../../shared/components/Sidebar/Sidebar.tsx"
import Header from "./components/Header/Header.tsx"
import VerticalSpacer from "../../../shared/components/VerticalSpacer.tsx"

const DirectMessagesBar = () => {
  return (
    <Sidebar header={<Header />}>
      <VerticalSpacer height={8} />
      <DirectMessagesList />
    </Sidebar>
  )
}

export default DirectMessagesBar
