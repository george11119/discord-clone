import styled from "styled-components"

const Wrapper = styled.div`
  justify-self: end;
  min-width: 340px;
  max-width: 340px;
  padding: 16px 8px 16px 16px;
  border-left: 1px solid rgba(78, 80, 88, 0.48);

  @media (max-width: 1250px) {
    display: none;
  }
`

const H1 = styled.h1`
  user-select: none;
  margin-top: 8px;
  margin-bottom: 16px;
  height: 24px;
  font-size: 19px;
  font-weight: 600;
  color: rgb(242, 243, 245);
`

const EmptyActivityTextWrapper = styled.div`
  padding: 16px;
  line-height: 18px;
  text-align: center;
`

const Header = styled.h2`
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 4px;
`

const Text = styled.div`
  color: rgb(181, 186, 193);
  font-size: 12px;
`

const UserActivityList = () => {
  return (
    <Wrapper>
      <H1>Active Now</H1>
      <EmptyActivityTextWrapper>
        <Header>It's quiet for now...</Header>
        <Text>
          When a friend starts an activity - like playing a game or hanging out
          on voice - we'll show it here! Just kidding im never implementing this
        </Text>
      </EmptyActivityTextWrapper>
    </Wrapper>
  )
}

export default UserActivityList
