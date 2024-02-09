import styled from "styled-components"
import Icon from "./Icon.tsx"

const Wrapper = styled.nav`
  background: rgb(30, 31, 34);
  width: 72px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  flex-shrink: 0;
`

const Sidebar = () => {
  return (
    <Wrapper>
      <Icon name={"group chat 1"} />
      <Icon name={"group chat 2"} />
      <Icon name={"league server"} />
      <Icon name={"homework server"} />
    </Wrapper>
  )
}

export default Sidebar
