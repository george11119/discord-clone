import DirectMessagesList from "./components/DirectMessagesList/DirectMessagesList.tsx"
import Sidebar from "../../../shared/components/Sidebar/Sidebar.tsx"
import Header from "./components/Header/Header.tsx"
import { DirectMessage } from "../../../../types.ts"
import styled from "styled-components"
import Friends from "../../../shared/svg/Friends.tsx"
import NumberBadge from "../../../shared/components/NumberBadge.tsx"
import Nitro from "../../../shared/svg/Nitro.tsx"
import Shop from "../../../shared/svg/Shop.tsx"
import DirectMessageBarButton from "./components/DirectMessagesButton/DirectMessagesBarButton.tsx"
import useFriendRequestStore from "../../../api/stores/friendRequestsStore.ts"

const Wrapper = styled.div`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
  flex: 1 1 auto;
`

const DirectMessagesBarButtons = () => {
  const friendRequestStore = useFriendRequestStore()
  const receivedFriendRequestsCount = friendRequestStore
    .getAll()
    .filter((fr) => fr.type === "received").length

  return (
    <>
      <DirectMessageBarButton
        text="Friends"
        icon={<Friends />}
        link="/channels/@me"
        badge={
          receivedFriendRequestsCount !== 0 && (
            <NumberBadge count={receivedFriendRequestsCount} />
          )
        }
      />
      <DirectMessageBarButton text="Nitro" icon={<Nitro />} link="#" />
      <DirectMessageBarButton text="Shop" icon={<Shop />} link="#" />
    </>
  )
}

const DirectMessageTitle = styled.h2`
  padding: 18px 0 4px 10px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  user-select: none;
`

const Title = styled.div`
  &:hover {
    color: #fff6f9;
  }
`

const DirectMessagesBar = ({
  directMessages,
}: {
  directMessages: DirectMessage[]
}) => {
  return (
    <Sidebar header={<Header />}>
      <Wrapper>
        <DirectMessagesBarButtons />
        <DirectMessageTitle>
          <Title>Direct Messages</Title>
        </DirectMessageTitle>
        <DirectMessagesList directMessages={directMessages} />
      </Wrapper>
    </Sidebar>
  )
}

export default DirectMessagesBar
