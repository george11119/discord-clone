import { FormEvent, useState } from "react"
import styled from "styled-components"
import LoginHeader from "./LoginHeader.tsx"
import FormInput from "../../../shared/components/FormInput.tsx"
import RegisterLink from "./RegisterLink.tsx"
import Button from "../../../shared/components/Button.tsx"

const Wrapper = styled.div`
  flex-grow: 1;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 384px;
`

const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (email: string, password: string) => Promise<void>
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setIsError(false)
      setIsLoading(true)
      await handleLogin(email, password)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setIsError(true)
    }
  }

  return (
    <Wrapper>
      <LoginHeader />
      <Form onSubmit={login}>
        <FormInput
          name="Email"
          type="email"
          value={email}
          setValue={setEmail}
          showErrorText={isError}
          errorText="Invalid email or password"
          required={true}
          data-testid="email-input"
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
          showErrorText={isError}
          errorText="Invalid email or password"
          required={true}
          data-testid="password-input"
        />
        <Button type="submit" text="Log in" isLoading={isLoading} />
      </Form>
      <RegisterLink />
    </Wrapper>
  )
}

export default LoginForm
