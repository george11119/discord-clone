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
  handleSignup: (username: string, password: string, email: string) => void
}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signup = (e: FormEvent) => {
    e.preventDefault()

    handleSignup(username, password, email)
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
        />
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
        <Button text="Continue" type="submit" />
      </Form>
    </Wrapper>
  )
}

export default SignupForm
