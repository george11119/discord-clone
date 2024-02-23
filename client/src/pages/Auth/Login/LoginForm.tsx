import { FormEvent, useState } from "react"
import styled from "styled-components"
import LoginHeader from "./LoginHeader.tsx"

const Wrapper = styled.div`
  flex-grow: 1;
  margin-right: 64px;
`


const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  height: 16px;
  font-size: 12px;
  font-weight: 700;
`

const Input = styled.input`
  margin-top: 8px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #1e1f22;
  border-radius: 3px;
  box-sizing: border-box;
  height: 40px;
  color: rgb(181, 186, 193);
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
        <div>
          <Label htmlFor="username">USERNAME: </Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">PASSWORD: </Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">Log in</Button>
      </Form>
    </Wrapper>
  )
}

export default LoginForm
