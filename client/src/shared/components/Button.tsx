import styled from "styled-components"
import LoadingSpinner from "../../pages/Auth/components/LoadingSpinner.tsx"
import * as React from "react"

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
  style,
  ...rest
}: {
  text: string
  isLoading?: boolean
  hoverColor?: string
  style?: React.CSSProperties
  [rest: string]: any
}) => {
  return (
    <Wrapper style={style} {...rest}>
      {isLoading ? <LoadingSpinner /> : text}
    </Wrapper>
  )
}

export default Button
