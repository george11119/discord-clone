import styled from "styled-components"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { DirectMessage } from "../../../../types.ts"
import DirectMessageChatHeader from "./components/Header/DirectMessageChatHeader.tsx"
import ChatContainer from "../../../shared/components/ChatContainer/ChatContainer.tsx"
import ProfilePanel from "./components/ProfilePanel/ProfilePanel.tsx"
import { useState } from "react"

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
  const queryClient = useQueryClient()
  const { channelId } = useParams()
  const [profilePanelShown, setProfilePanelShown] = useState(() => {
    const shown = localStorage.getItem("discord-clone-profile-panel-shown")
    return shown === "hide" ? false : true
  })

  const directMessages = queryClient.getQueryData([
    "direct-messages",
  ]) as DirectMessage[]

  const directMessage = directMessages.find(
    (dm) => dm.channel?.id === channelId,
  )

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
