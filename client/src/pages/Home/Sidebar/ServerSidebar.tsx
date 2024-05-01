import styled from "styled-components"
import Separator from "./components/Separator.tsx"
import VerticalSpacer from "../../../shared/components/VerticalSpacer.tsx"
import HomeIcon from "./components/HomeIcon.tsx"
import ServerIcon from "./components/ServerIcon.tsx"
import CreateServerButton from "./components/CreateServerButton.tsx"
import { Server } from "../../../../types.ts"
import useDirectMessagesStore from "../../../api/stores/directMessageStore.ts"
import DirectMessageIcon from "./components/DirectMessageIcon.tsx"
import { motion, AnimatePresence } from "framer-motion"

const Wrapper = styled.nav`
  background: rgb(30, 31, 34);
  height: 100vh;
  display: flex;
  box-sizing: border-box; // wtf this
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  flex-shrink: 0;
  overflow-y: scroll;
  scrollbar-width: none;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`

const ServerSidebar = ({ servers }: { servers: Server[] }) => {
  const directMessagesStore = useDirectMessagesStore()
  const unseenDirectMessages = directMessagesStore
    .get()
    .filter((dm) => dm.seenMessagesCount !== dm.channel?.messageCount)

  return (
    <Wrapper>
      <AnimatePresence initial={false}>
        <HomeIcon key="homeIcon" />
        {unseenDirectMessages.map((dm) => {
          return (
            <motion.div
              key={dm.id}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
            >
              <DirectMessageIcon directMessage={dm} />
            </motion.div>
          )
        })}
        <InnerWrapper key="innerWrapper">
          <Separator type={"thick"} />
          {servers?.map((server) => {
            return <ServerIcon key={server.id} server={server} />
          })}
          <CreateServerButton />
          <VerticalSpacer height={12} />
        </InnerWrapper>
      </AnimatePresence>
    </Wrapper>
  )
}

export default ServerSidebar
