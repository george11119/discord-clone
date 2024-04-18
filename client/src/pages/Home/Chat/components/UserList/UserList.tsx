import styled from "styled-components"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import serverService from "../../../../../api/services/serverService.ts"
import { useContext } from "react"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { User } from "../../../../../../types.ts"
import UserListItem from "./UserListItem.tsx"

const Wrapper = styled.div`
  width: 240px;
  flex-shrink: 0;
  background-color: rgb(43, 45, 49);
  padding-bottom: 20px;
`

const ListTitle = styled.div`
  padding: 24px 8px 4px 16px;
  color: rgb(148, 155, 164);
  font-size: 12px;
  font-weight: 600;
`

const List = styled.div``

const UserList = () => {
  const { token } = useContext(AuthContext)
  const { serverId } = useParams()

  const result = useQuery({
    queryKey: [`users-${serverId}`],
    queryFn: () => serverService.getUsers(token as string, serverId as string),
  })

  if (result.isLoading) return <Wrapper />

  const users: User[] = result.data

  return (
    <Wrapper>
      <ListTitle>MEMBERS—{users.length}</ListTitle>
      <List>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </List>
    </Wrapper>
  )
}

export default UserList
