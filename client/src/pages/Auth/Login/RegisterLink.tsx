import { Link } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  margin-top: 16px;
  height: 18px;
  font-size: 13px;
`

const Span = styled.span`
  color: rgb(148, 155, 164);
`

const LinkWrapper = styled(Link)`
  color: rgb(0, 168, 252);
  text-decoration: none;

  &:visited {
    color: rgb(0, 168, 252);
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`

const RegisterLink = () => {
  return (
    <Wrapper>
      <Span>Need an account? </Span>{" "}
      <LinkWrapper to="/signup">Register</LinkWrapper>
    </Wrapper>
  )
}

export default RegisterLink
