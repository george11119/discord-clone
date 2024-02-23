import styled from "styled-components"
// @ts-expect-error eslint stfu
import GoogleIcon from "../assets/google_icon.svg"
// @ts-expect-error eslint stfu
import DiscordIcon from "../assets/discord_icon.svg"
// @ts-expect-error eslint stfu
import GithubIcon from "../assets/github_icon.svg"

const Wrapper = styled.div`
  width: 240px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: 20px;
  margin-right: 32px;
`

const Button = styled.button`
  height: 44px;
  font-size: 15px;
  padding: 14px 25px;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  font-weight: 600;
  gap: 12px;

  &:hover {
    filter: brightness(95%);
  }
`

const OAuthButtons = () => {
  return (
    <Wrapper>
      <Button style={{ backgroundColor: "rgb(88, 101, 242)", color: "white" }}>
        <img src={DiscordIcon} alt="discord icon" />
        Login with Discord
      </Button>
      <Button>
        <img src={GoogleIcon} alt="google icon" />
        Login with Google
      </Button>
      <Button>
        <img src={GithubIcon} alt="github icon" />
        Login with Github
      </Button>
      <Button>Continue as Guest</Button>
    </Wrapper>
  )
}

export default OAuthButtons
