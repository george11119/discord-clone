import styled from "styled-components"
import GoogleIcon from "../assets/GoogleIcon.tsx"
import DiscordIcon from "../assets/DiscordIcon.tsx"
import GithubIcon from "../assets/GithubIcon.tsx"
import config from "../../../config/config.ts"

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
  const googleOAuthAction = () => {
    window.open(`${config.API_ENDPOINT}/auth/google`, "_self")
  }

  const discordOAuthAction = () => {
    window.open(`${config.API_ENDPOINT}/auth/discord`, "_self")
  }

  const githubOAuthAction = () => {
    window.open(`${config.API_ENDPOINT}/auth/github`, "_self")
  }

  const buttonText: string = isLoginPage ? "Login" : "Sign up"

  return (
    <Wrapper $isLoginPage={isLoginPage}>
      <Button
        $isLoginPage={isLoginPage}
        onClick={discordOAuthAction}
        style={{ backgroundColor: "rgb(88, 101, 242)", color: "white" }}
      >
        <DiscordIcon />
        {buttonText} with Discord
      </Button>
      <Button $isLoginPage={isLoginPage} onClick={googleOAuthAction}>
        <GoogleIcon />
        {buttonText} with Google
      </Button>
      <Button $isLoginPage={isLoginPage} onClick={githubOAuthAction}>
        <GithubIcon />
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
