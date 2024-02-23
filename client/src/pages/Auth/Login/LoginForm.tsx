import { FormEvent, useState } from "react"
import styled from "styled-components"
import LoginHeader from "./LoginHeader.tsx"
import FormInput from "../../../shared/components/FormInput.tsx"
import RegisterLink from "./RegisterLink.tsx"
import Button from "../components/Button.tsx"

const Wrapper = styled.div`
  flex-grow: 1;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (username: string, password: string) => void
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = (e: FormEvent) => {
    e.preventDefault()

    handleLogin(email, password)
  }

  return (
    <Wrapper>
      <LoginHeader />
      <Form onSubmit={login}>
        <FormInput name="Email" type="text" value={email} setValue={setEmail} />
        <FormInput
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Button type="submit" text="Log in" />
      </Form>
      <RegisterLink />
    </Wrapper>
  )
}

export default LoginForm
