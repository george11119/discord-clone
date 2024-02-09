import styled from "styled-components"
import Icon from "./Icon.tsx"
import Separator from "./Separator.tsx"

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
  overflow-y: scroll;
  scrollbar-width: none;
`

const Sidebar = () => {
  return (
    <Wrapper>
      <Icon name={"group chat 1"} isIcon={true} />
      <Separator />
      <Icon
        name={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, ullam?"
        }
      />
      <Icon name={"AAAA"} />
      <Icon name={"BBBB"} />
      <Icon name={"CCCC"} />
      <Icon name={"DDDD"} />
      <Icon name={"EEEE"} />
      <Icon name={"FFFF"} />
      <Icon name={"GGGG"} />
      <Icon name={"HHHH"} />
      <Icon name={"JJJ"} />
      <Icon name={"KKKK"} />
      <Icon name={"LLLL"} />
      <Icon name={"MMMM"} />
      <Icon name={"NNNN"} />
      <Icon name={"OOOO"} />
      <Icon name={"PPPP"} />
      <Icon name={"QQQQ"} />
      <Icon name={"league server"} />
      <Icon name={"homework server"} />
    </Wrapper>
  )
}

export default Sidebar
