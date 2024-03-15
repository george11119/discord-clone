import styled from "styled-components"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import ConversationSearchButton from "./ConversationSearchButton.tsx"
import ChannelTitle from "./ChannelTitle.tsx"
import { matchPath, useLocation } from "react-router-dom"
import { useState } from "react"
import ServerOptionsPopout from "./ServerOptionsPopout.tsx"

const Wrapper = styled.div`
  box-shadow:
    rgba(2, 2, 2, 0.2) 0px 1px 0px 0px,
    rgba(6, 6, 7, 0.05) 0px 1.5px 0px 0px,
    rgba(2, 2, 2, 0.05) 0px 2px 0px 0px;
  height: 24px;
  padding: 12px 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  overflow: initial;
  transition-duration: 0.15s;
  user-select: none;

  &:hover {
    background-color: #35373c;
  }
`

const Header = () => {
  const [popoutOpen, setPopoutOpen] = useState(false)
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)

  const togglePopoutVisibility = (e: any) => {
    e.stopPropagation()
    setPopoutOpen(!popoutOpen)
  }

  return (
    <div style={{ position: "relative" }}>
      {popoutOpen && <ServerOptionsPopout setPopoutOpen={setPopoutOpen} />}
      <Wrapper
        onClick={togglePopoutVisibility}
        style={popoutOpen ? { backgroundColor: "#35373c" } : {}}
      >
        {isHomeLink ? (
          <ConversationSearchButton />
        ) : (
          <ChannelTitle title="Hello" popoutOpen={popoutOpen} />
        )}
      </Wrapper>
      <VerticalSpacer height={8} />
    </div>
  )
}

export default Header
