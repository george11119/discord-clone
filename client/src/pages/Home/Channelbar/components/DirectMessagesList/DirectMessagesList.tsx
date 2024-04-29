import styled from "styled-components"
import { ReactNode } from "react"
import HorizontalSpacer from "../../../../../shared/components/HorizontalSpacer.tsx"
import Friends from "../../../../../shared/svg/Friends.tsx"
import Nitro from "../../../../../shared/svg/Nitro.tsx"
import Shop from "../../../../../shared/svg/Shop.tsx"
import { Link, matchPath, useLocation } from "react-router-dom"
import { FriendRequestItem } from "../../../../../../types.ts"
import { useQueryClient } from "@tanstack/react-query"
import NumberBadge from "../../../../../shared/components/NumberBadge.tsx"

const Wrapper = styled.div`
  list-style: none;
  margin: 0 8px;
  color: rgb(148, 155, 164);
  flex: 1 1 auto;
`

const ButtonWrapper = styled(Link)`
  height: 42px;
  width: 208px;
  padding: 0 8px;
  margin: 2px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  gap: 8px;

  &:hover {
    color: white;
    background-color: #404249;
  }
`

const ButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`

const IconWrapper = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BadgeWrapper = styled.div`
  justify-self: end;
`

const DMListButton = ({
  text,
  icon,
  link,
  badge,
}: {
  text: string
  icon: ReactNode
  link: string
  badge?: ReactNode
}) => {
  const { pathname } = useLocation()
  const isActiveLink = matchPath(`${link}`, pathname)

  return (
    <ButtonWrapper
      style={isActiveLink ? { backgroundColor: "#404249", color: "white" } : {}}
      to={`${link}`}
    >
      <ButtonContentWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <HorizontalSpacer width={12} />
        {text}
      </ButtonContentWrapper>
      <BadgeWrapper>{badge}</BadgeWrapper>
    </ButtonWrapper>
  )
}

const DirectMessagesList = () => {
  const queryClient = useQueryClient()
  const friendRequests = queryClient.getQueryData([
    "friendRequests",
  ]) as FriendRequestItem[]
  const receivedFriendRequestsCount = friendRequests.filter(
    (fr) => fr.type === "received",
  ).length

  return (
    <Wrapper>
      <DMListButton
        text="Friends"
        icon={<Friends />}
        link="/channels/@me"
        badge={
          receivedFriendRequestsCount !== 0 && (
            <NumberBadge count={receivedFriendRequestsCount} />
          )
        }
      />
      <DMListButton text="Nitro" icon={<Nitro />} link="#" />
      <DMListButton text="Shop" icon={<Shop />} link="#" />
      // TODO when you create a direct messages model add it here
    </Wrapper>
  )
}

export default DirectMessagesList
