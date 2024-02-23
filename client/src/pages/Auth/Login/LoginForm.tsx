import { FormEvent, useState } from "react"
import styled from "styled-components"
import LoginHeader from "./LoginHeader.tsx"
import FormInput from "../../../shared/components/FormInput.tsx"
import RegisterLink from "./RegisterLink.tsx"

const Wrapper = styled.div`
  flex-grow: 1;
  margin-right: 64px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  margin-top: 24px;
  height: 44px;
  background-color: rgb(88, 101, 242);
  color: white;
  border-style: none;
  border-radius: 3px;
  font-size: 16px;

  &:hover {
    background-color: rgb(71, 82, 196);
    transition-duration: 0.15s;
  }
`

const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (username: string, password: string) => void
}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = (e: FormEvent) => {
    e.preventDefault()

    handleLogin(username, password)
  }

  return (
    <Wrapper>
      <LoginHeader />
      <Form onSubmit={login}>
        <FormInput
          name="username"
          type="text"
          value={username}
          setValue={setUsername}
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Button type="submit">Log in</Button>
      </Form>
      <RegisterLink />
    </Wrapper>
  )
}

export default LoginForm
