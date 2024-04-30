import styled from "styled-components"
import { useParams } from "react-router-dom"
import { User } from "../../../../../../types.ts"
import UserListItem from "./UserListItem.tsx"
import serverQueries from "../../../../../api/queries/serverQueries.ts"

const Wrapper = styled.div`
  width: 240px;
  flex-shrink: 0;
  background-color: rgb(43, 45, 49);
  padding-bottom: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
  scrollbar-width: thin;
`

const ListTitle = styled.div`
  padding: 24px 8px 4px 16px;
  color: rgb(148, 155, 164);
  font-size: 12px;
  font-weight: 600;
`

const List = styled.div``

const UserList = () => {
  const { serverId } = useParams()

  const result = serverQueries.useGetUsersOfServer(serverId)

  if (result.isLoading) return <Wrapper />

  const users: User[] = result.data

  return (
    <Wrapper>
      <ListTitle>MEMBERS — {users.length}</ListTitle>
      <List>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </List>
    </Wrapper>
  )
}

export default UserList
