import styled from "styled-components"
import Hashtag from "../../../../../shared/svg/Hashtag.tsx"
import HeaderButtons from "./HeaderButtons.tsx"

const Wrapper = styled.div`
  box-shadow:
    rgba(2, 2, 2, 0.2) 0px 1px 0px 0px,
    rgba(6, 6, 7, 0.05) 0px 1.5px 0px 0px,
    rgba(2, 2, 2, 0.05) 0px 2px 0px 0px;
  height: 32px;
  padding: 8px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  user-select: none;
  justify-content: space-between;
`

const Left = styled.div`
  padding-left: 8px;
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const Header = ({
  chatTitle,
  setUserListShown,
}: {
  chatTitle: string
  setUserListShown: (x: boolean) => void
}) => {
  return (
    <Wrapper>
      <Left>
        <Hashtag size={24} color="#80848e" />
        <h1>{chatTitle}</h1>
      </Left>
      <Right>
        <HeaderButtons />
      </Right>
    </Wrapper>
  )
}

export default Header
