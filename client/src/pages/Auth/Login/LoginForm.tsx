import { FormEvent, useState } from "react"
import styled from "styled-components"

const Input = styled.input`
  outline: black;
  border: 1px solid black;
  max-width: 200px;
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
    <>
      <h1>Log in</h1>
      <form onSubmit={login}>
        <div>
          <label htmlFor="username">username: </label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  )
}

export default LoginForm
