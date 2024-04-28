import styled from "styled-components"
import { useState } from "react"
import { FriendRequest, User } from "../../../../../../types.ts"
import PeopleListItem from "./PeopleListItem.tsx"
import RelationshipsSearchbar from "./RelationshipsSearchbar.tsx"
import { FriendsDisplayTypes } from "../../FriendsDisplayContainer.tsx"

const Wrapper = styled.div`
  width: 100%;
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
  height: 100%;
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
          <PeopleListItem user={friend} type={"friend"} />
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
  friendRequests: {
    sent: FriendRequest[]
    received: FriendRequest[]
  }
  searchValue: string
}) => {
  const searchValueRegex = new RegExp(searchValue)
  const { sent, received } = friendRequests

  const sentList = sent.map((sentRequest) => {
    return { type: "sent", user: sentRequest.receiver }
  })

  const receivedList = received.map((receivedRequest) => {
    return { type: "received", user: receivedRequest.sender }
  })

  const requestsList = [...receivedList, ...sentList].filter((request) =>
    request.user.username.match(searchValueRegex),
  )

  return (
    <>
      <PeopleListTitle display={display} peopleCount={requestsList.length} />
      <PeopleList>
        {requestsList.map((request) => (
          <PeopleListItem
            user={request.user}
            type={request.type as "sent" | "received"}
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
  friendRequests: {
    sent: FriendRequest[]
    received: FriendRequest[]
  }
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
