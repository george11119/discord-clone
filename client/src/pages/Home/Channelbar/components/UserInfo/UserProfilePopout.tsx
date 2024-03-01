import styled from "styled-components"

const Wrapper = styled.div<{ $popoutOpen: boolean }>`
  display: ${(props) => (props.$popoutOpen ? "flex" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(calc(-100% - 8px)) translateX(-32px);
  width: 340px;
  background-color: rgb(35, 36, 40);
  flex-direction: column;
  border-radius: 8px;
  max-height: 800px;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  border-radius: 8px;
  background-color: rgb(17, 18, 20);
  padding: 12px;
  max-height: 700px;
`

const UserProfilePopout = ({ popoutOpen }: { popoutOpen: boolean }) => {
  return (
    <Wrapper $popoutOpen={popoutOpen}>
      <InnerWrapper>
        <div>asda</div>
        <div>asda</div>
        <div>asda</div>
        <div>asda</div>
        <div>asda</div>
      </InnerWrapper>
    </Wrapper>
  )
}

export default UserProfilePopout
