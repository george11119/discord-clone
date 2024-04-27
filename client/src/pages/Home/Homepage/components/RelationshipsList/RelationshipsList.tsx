import styled from "styled-components"
import SearchIcon from "../../../../../shared/svg/SearchIcon.tsx"
import { useState } from "react"
import CloseIcon from "../../../../../shared/svg/CloseIcon.tsx"
import { FriendRequest, User } from "../../../../../../types.ts"

const Wrapper = styled.div`
  width: 100%;
`

const SearchBarWrapper = styled.div`
  display: flex;
  margin: 16px 20px 8px 30px;
  padding: 1px;
  background-color: rgb(30, 31, 34);
  border-radius: 4px;
`

const SearchBar = styled.input`
  height: 30px;
  margin: 1px;
  background-color: rgb(30, 31, 34);
  padding: 0 8px;
  color: rgb(219, 222, 225);
  font-size: 15px;

  &::placeholder {
    color: #8a9199;
  }
`

const IconContainer = styled.div`
  color: #8a9199;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  margin: 24px 20px 8px 30px;
  line-height: 16px;
  font-weight: 600;
  color: rgb(181, 186, 193);
`

const PeopleList = styled.div`
  overflow: hidden scroll;
  padding-right: 0px;
  padding-bottom: 8px;
  margin-top: 16px;
  position: relative;
  box-sizing: border-box;
  min-height: 0;
  flex: 1 1 auto;
  height: 100%;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
`

const PeopleListItemWrapper = styled.div`
  margin-left: 30px;
  margin-right: 20px;
  height: 62px;
  border-top: 0.67px solid rgba(78, 80, 88, 0.48);
  display: flex;
  align-items: center;
`

const PeopleListTitle = ({ display }: { display: string }) => {
  let displayType = ""
  if (display === "online") {
    displayType = "Online"
  } else if (display === "all") {
    displayType = "All friends"
  } else if (display === "pending") {
    displayType = "Pending"
  } else if (display === "blocked") {
    displayType = "blocked"
  }
  return <Title>{displayType} — 0</Title>
}

const FriendsList = ({ friends }: { friends: User[] }) => {
  return (
    <PeopleList>
      {friends.map((friend) => (
        <PeopleListItem person={friend} />
      ))}
    </PeopleList>
  )
}

const PendingRelationshipsList = ({
  friendRequests,
}: {
  friendRequests: {
    sent: FriendRequest[]
    received: FriendRequest[]
  }
}) => {
  const { sent, received } = friendRequests

  const sentFriendRequests = sent.map((sentRequest) => (
    <PeopleListItem person={sentRequest.receiver} />
  ))
  const receivedFriendRequests = received.map((receivedRequest) => (
    <PeopleListItem person={receivedRequest.sender} />
  ))

  return (
    <PeopleList>
      {...sentFriendRequests}
      {...receivedFriendRequests}
    </PeopleList>
  )
}

const PeopleListItem = ({ person }: { person: User }) => {
  return (
    <PeopleListItemWrapper>
      <div>{person.username}</div>
    </PeopleListItemWrapper>
  )
}

const RelationshipsList = ({
  display,
  friends,
  friendRequests,
}: {
  display: string
  friends: User[]
  friendRequests: {
    sent: FriendRequest[]
    received: FriendRequest[]
  }
}) => {
  const [searchValue, setSearchValue] = useState("")

  if (display === "blocked") {
    return (
      <Wrapper>
        <SearchBarWrapper>
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"Search"}
          />
          <IconContainer
            onClick={() => searchValue !== "" && setSearchValue("")}
          >
            {searchValue === "" ? (
              <SearchIcon size={20} />
            ) : (
              <CloseIcon size={20} fill={"#8a9199"} />
            )}
          </IconContainer>
        </SearchBarWrapper>

        <PeopleListTitle display={display} />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <SearchBarWrapper>
        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search"}
        />
        <IconContainer onClick={() => searchValue !== "" && setSearchValue("")}>
          {searchValue === "" ? (
            <SearchIcon size={20} />
          ) : (
            <CloseIcon size={20} fill={"#8a9199"} />
          )}
        </IconContainer>
      </SearchBarWrapper>

      <PeopleListTitle display={display} />
      {display === "pending" ? (
        <PendingRelationshipsList friendRequests={friendRequests} />
      ) : (
        <FriendsList friends={friends} />
      )}
    </Wrapper>
  )
}

export default RelationshipsList
