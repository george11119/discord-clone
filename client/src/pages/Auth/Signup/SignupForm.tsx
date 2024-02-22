import { FormEvent, useState } from "react"
import styled from "styled-components"

const Input = styled.input`
  outline: black;
  border: 1px solid black;
  max-width: 200px;
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
    <>
      <h1>Log in</h1>
      <form onSubmit={signup}>
        <div>
          <label htmlFor="email">email: </label>
          <Input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
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
        <button type="submit">Sign up</button>
      </form>
    </>
  )
}

export default SignupForm
