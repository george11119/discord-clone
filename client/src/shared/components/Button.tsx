import styled from "styled-components"
import LoadingDots from "../../pages/Auth/components/LoadingDots.tsx"
import * as React from "react"

const Wrapper = styled.button`
  margin-top: 24px;
  height: 44px;
  background-color: rgb(88, 101, 242);
  color: white;
  border-style: none;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;

  &:hover:enabled {
    background-color: rgb(71, 82, 196);
    transition-duration: 0.15s;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
      {isLoading ? <LoadingDots /> : text}
    </Wrapper>
  )
}

export default Button
