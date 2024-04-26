import Header from "./components/Header/Header.tsx"
import ChannelList from "./components/ChannelList/ChannelList.tsx"
import Sidebar from "../../../shared/components/Sidebar/Sidebar.tsx"

const Channelbar = () => {
  return (
    <Sidebar header={<Header />}>
      <ChannelList />
    </Sidebar>
  )
}

export default Channelbar
