import styled from "styled-components"
import LoadingSpinner from "./LoadingSpinner.tsx"

const Wrapper = styled.button`
  margin-top: 24px;
  height: 44px;
  background-color: rgb(88, 101, 242);
  color: white;
  border-style: none;
  border-radius: 3px;
  font-size: 16px;

  &:hover {
    background-color: rgb(71, 82, 196);
    transition-duration: 0.15s;
  }
`

const Button = ({
  text,
  isLoading = false,
  ...rest
}: {
  text: string
  isLoading?: boolean
  [rest: string]: any
}) => {
  return <Wrapper {...rest}>{isLoading ? <LoadingSpinner /> : text}</Wrapper>
}

export default Button
