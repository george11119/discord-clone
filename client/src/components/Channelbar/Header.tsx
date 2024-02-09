import styled from "styled-components"
import VerticalSpacer from "../shared/components/VerticalSpacer.tsx"

const Wrapper = styled.div`
  box-shadow:
    rgba(2, 2, 2, 0.2) 0px 1px 0px 0px,
    rgba(6, 6, 7, 0.05) 0px 1.5px 0px 0px,
    rgba(2, 2, 2, 0.05) 0px 2px 0px 0px;
  height: 24px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
`

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <Wrapper>{title}</Wrapper>
      <VerticalSpacer height={12} />
    </>
  )
}

export default Header
