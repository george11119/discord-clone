import styled from "styled-components"
import Icon from "./components/Icon.tsx"
import Separator from "./components/Separator.tsx"
import VerticalSpacer from "../../../shared/components/VerticalSpacer.tsx"

const Wrapper = styled.nav`
  background: rgb(30, 31, 34);
  width: 72px;
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

const Sidebar = () => {
  return (
    <Wrapper>
      <Icon name={"group chat 1"} isIcon={true} />
      <Separator />
      <Icon name={"AAAA"} />
      <Icon name={"BBBB"} />
      <Icon name={"CCCC"} />
      <VerticalSpacer height={12} />
    </Wrapper>
  )
}

export default Sidebar
