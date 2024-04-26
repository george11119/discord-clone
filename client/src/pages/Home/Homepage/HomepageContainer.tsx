import styled from "styled-components"
import HomepageContainerHeader from "./components/Header/HomepageContainerHeader.tsx"

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

const ChatContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const HomepageContainer = () => {
  return (
    <Wrapper
      style={{
        alignItems: "center",
        justifyContent: "center",
        color: "rgb(148, 155, 164)",
      }}
    >
      <HomepageContainerHeader />
      <MainContainer>
        <ChatContent>
          <div>asdf</div>
        </ChatContent>
      </MainContainer>
    </Wrapper>
  )
}

export default HomepageContainer
