import { ReactNode } from "react"
import { Link, matchPath, useLocation } from "react-router-dom"
import HorizontalSpacer from "../../../../../shared/components/HorizontalSpacer.tsx"
import styled from "styled-components"

const ButtonWrapper = styled(Link)`
  padding: 0 12px;
  height: 42px;
  width: 200px;
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

const DirectMessageBarButton = ({
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

export default DirectMessageBarButton
