import styled from "styled-components"
import Button from "../../../../../shared/components/Button.tsx"
import { FormEvent, useState } from "react"

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 30px;
  line-height: 20px;
`

const H1 = styled.h1`
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  user-select: none;
`

const InfoText = styled.div`
  font-size: 12px;
  user-select: none;
  color: rgb(181, 186, 193);
`

const AddFriendForm = styled.form`
  margin-top: 16px;
  padding: 0 12px;
  height: 48px;
  border-radius: 8px;
  background-color: rgb(30, 31, 34);
  display: flex;
  align-items: center;
`

const AddFriendInput = styled.input`
  width: calc(100% - 160px);
  height: 40px;
  background-color: rgb(30, 31, 34);
  color: rgb(219, 222, 225);
  font-size: 16px;
`

const AddFriendPage = () => {
  const [username, setUsername] = useState("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setUsername("")
  }

  return (
    <Wrapper>
      <H1>Add friend</H1>
      <InfoText>You can add friends with their Discord username.</InfoText>
      <AddFriendForm onSubmit={onSubmit}>
        <AddFriendInput
          placeholder="You can add friends with their Discord username."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          text="Send Friend Request"
          style={{
            fontSize: 13,
            marginTop: 0,
            padding: "2px 16px",
            height: 32,
            width: "160px",
            marginLeft: 12,
          }}
          type="submit"
          disabled={username === ""}
        />
      </AddFriendForm>
    </Wrapper>
  )
}

export default AddFriendPage
