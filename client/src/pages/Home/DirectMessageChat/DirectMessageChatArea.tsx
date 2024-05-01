import styled from "styled-components"
import { useParams } from "react-router-dom"
import DirectMessageChatHeader from "./components/Header/DirectMessageChatHeader.tsx"
import ChatContainer from "../../../shared/components/ChatContainer/ChatContainer.tsx"
import ProfilePanel from "./components/ProfilePanel/ProfilePanel.tsx"
import { useEffect, useState } from "react"
import useDirectMessagesStore from "../../../api/stores/directMessageStore.ts"
import { storeLastHomepageUrl } from "../../../utils/storeLastHomepageUrl.ts"
import directMessagesQueries from "../../../api/queries/directMessagesQueries.ts"

const Wrapper = styled.div`
  background-color: rgb(49, 51, 56);
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-grow: 1;
`

const DirectMessageChatArea = () => {
  const { channelId } = useParams()
  const [profilePanelShown, setProfilePanelShown] = useState(() => {
    const shown = localStorage.getItem("discord-clone-profile-panel-shown")
    return shown === "hide" ? false : true
  })
  const directMessageStore = useDirectMessagesStore()

  const directMessages = directMessageStore.get()
  const directMessage = directMessages.find(
    (dm) => dm.channel?.id === channelId,
  )
  storeLastHomepageUrl(`${channelId}`)

  const updateSeenMessagesCountMutation =
    directMessagesQueries.useUpdateSeenMessagesCount(
      directMessage?.channel?.id as string,
    )

  useEffect(() => {
    if (
      directMessage?.seenMessagesCount !== directMessage?.channel?.messageCount
    ) {
      updateSeenMessagesCountMutation.mutate(directMessage?.id as string)
    }
  }, [channelId])

  return (
    <Wrapper>
      <DirectMessageChatHeader
        recepient={directMessage?.recepient}
        profilePanel={{ profilePanelShown, setProfilePanelShown }}
      />
      <MainContainer>
        <ChatContainer />
        {profilePanelShown && <ProfilePanel user={directMessage?.recepient} />}
      </MainContainer>
    </Wrapper>
  )
}

export default DirectMessageChatArea
