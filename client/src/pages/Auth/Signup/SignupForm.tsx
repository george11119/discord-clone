import { FormEvent, useState } from "react"
import styled from "styled-components"
import FormInput from "../../../shared/components/FormInput.tsx"
import Button from "../components/Button.tsx"

const Wrapper = styled.div``

const Header = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 24px;
  color: rgb(242, 243, 245);
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  user-select: none;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const SignupForm = ({
  handleSignup,
}: {
  handleSignup: (
    username: string,
    password: string,
    email: string,
  ) => Promise<void>
}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const signup = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setIsError(false)
      setIsLoading(true)
      await handleSignup(username, password, email)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setIsError(true)
    }
  }

  return (
    <Wrapper>
      <Header>Create an account</Header>
      <Form onSubmit={signup}>
        <FormInput
          name="email"
          type="email"
          value={email}
          setValue={setEmail}
          showErrorText={isError}
          errorText="Invalid email, username, or password"
          required={true}
          data-testid="email-input"
        />
        <FormInput
          name="username"
          type="text"
          value={username}
          setValue={setUsername}
          showErrorText={isError}
          errorText="Invalid email, username, or password"
          required={true}
          data-testid="username-input"
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
          showErrorText={isError}
          errorText="Invalid email, username, or password"
          required={true}
          data-testid="password-input"
        />
        <Button text="Continue" type="submit" isLoading={isLoading} />
      </Form>
    </Wrapper>
  )
}

export default SignupForm
