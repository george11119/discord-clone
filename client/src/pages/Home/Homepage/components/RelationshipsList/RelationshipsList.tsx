import styled from "styled-components"
import { useState } from "react"
import { FriendRequestItem, User } from "../../../../../../types.ts"
import PeopleListItem from "./PeopleListItem.tsx"
import RelationshipsSearchbar from "./RelationshipsSearchbar.tsx"
import { FriendsDisplayTypes } from "../../FriendsDisplayContainer.tsx"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  margin: 24px 20px 8px 30px;
  line-height: 16px;
  font-weight: 600;
  color: rgb(181, 186, 193);
`

const PeopleListTitle = ({
  display,
  peopleCount,
}: {
  display: FriendsDisplayTypes
  peopleCount: number
}) => {
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
  return (
    <Title>
      {displayType} — {peopleCount}
    </Title>
  )
}

const PeopleList = styled.div`
  overflow: hidden scroll;
  padding-right: 0px;
  padding-bottom: 8px;
  margin-top: 16px;
  position: relative;
  box-sizing: border-box;
  min-height: 0;
  flex: 1 1 auto;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
`

const FriendsList = ({
  display,
  friends,
  searchValue,
}: {
  display: FriendsDisplayTypes
  friends: User[]
  searchValue: string
}) => {
  const searchValueRegex = new RegExp(searchValue)
  const friendsList = friends.filter((friend) =>
    friend.username.match(searchValueRegex),
  )

  return (
    <>
      <PeopleListTitle display={display} peopleCount={friendsList.length} />
      <PeopleList>
        {friendsList.map((friend) => (
          <PeopleListItem key={friend.id} user={friend} type={"friend"} />
        ))}
      </PeopleList>
    </>
  )
}

const PendingRelationshipsList = ({
  display,
  friendRequests,
  searchValue,
}: {
  display: FriendsDisplayTypes
  friendRequests: FriendRequestItem[]
  searchValue: string
}) => {
  const searchValueRegex = new RegExp(searchValue)
  const requestsList = friendRequests.filter((friendRequest) =>
    friendRequest.user.username.match(searchValueRegex),
  )

  return (
    <>
      <PeopleListTitle display={display} peopleCount={requestsList.length} />
      <PeopleList>
        {requestsList.map((friendRequest) => (
          <PeopleListItem
            key={friendRequest.user.id}
            user={friendRequest.user}
            type={friendRequest.type}
          />
        ))}
      </PeopleList>
    </>
  )
}

const RelationshipsList = ({
  display,
  friends,
  friendRequests,
}: {
  display: FriendsDisplayTypes
  friends: User[]
  friendRequests: FriendRequestItem[]
}) => {
  const [searchValue, setSearchValue] = useState("")

  if (display === "blocked") {
    return (
      <Wrapper>
        <RelationshipsSearchbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <PeopleListTitle display={display} peopleCount={0} />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <RelationshipsSearchbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {display === "pending" ? (
        <PendingRelationshipsList
          display={display}
          friendRequests={friendRequests}
          searchValue={searchValue}
        />
      ) : (
        <FriendsList
          display={display}
          friends={friends}
          searchValue={searchValue}
        />
      )}
    </Wrapper>
  )
}

export default RelationshipsList
