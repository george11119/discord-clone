import styled from "styled-components"
// @ts-expect-error eslint stfu
import GoogleIcon from "../assets/google_icon.svg"
// @ts-expect-error eslint stfu
import DiscordIcon from "../assets/discord_icon.svg"
// @ts-expect-error eslint stfu
import GithubIcon from "../assets/github_icon.svg"

const Wrapper = styled.div<{ $isLoginPage: boolean }>`
  width: ${(props) => (props.$isLoginPage ? 240 : 416)}px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => (props.$isLoginPage ? "auto" : 0)};
  margin-bottom: ${(props) => (props.$isLoginPage ? 20 : 16)}px;
  margin-right: 32px;
`

const Button = styled.button<{ $isLoginPage: boolean }>`
  height: 44px;
  font-size: 15px;
  padding: 14px 25px;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.$isLoginPage ? 20 : 12)}px;
  justify-content: center;
  font-weight: 600;
  gap: 12px;

  &:hover {
    filter: brightness(95%);
  }
`

const OAuthButtons = ({ isLoginPage }: { isLoginPage: boolean }) => {
  const buttonText: string = isLoginPage ? "Login" : "Sign up"

  return (
    <Wrapper $isLoginPage={isLoginPage}>
      <Button
        $isLoginPage={isLoginPage}
        onClick={() => alert("Not implemented")}
        style={{ backgroundColor: "rgb(88, 101, 242)", color: "white" }}
      >
        <img src={DiscordIcon} alt="discord icon" />
        {buttonText} with Discord
      </Button>
      <Button
        $isLoginPage={isLoginPage}
        onClick={() => alert("Not implemented")}
      >
        <img src={GoogleIcon} alt="google icon" />
        {buttonText} with Google
      </Button>
      <Button
        $isLoginPage={isLoginPage}
        onClick={() => alert("Not implemented")}
      >
        <img src={GithubIcon} alt="github icon" />
        {buttonText} with Github
      </Button>
      {isLoginPage && (
        <Button
          $isLoginPage={isLoginPage}
          onClick={() => alert("Not implemented")}
        >
          Continue as Guest
        </Button>
      )}
    </Wrapper>
  )
}

export default OAuthButtons
