import styled, { keyframes } from "styled-components"

const animation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(.8);
    opacity: .3;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const SpinnerItem = styled.span`
  width: 6px;
  height: 6px;
  margin-right: 2px;
  background-color: white;
  border-radius: 3px;
  display: inline-block;
  opacity: 0.3;
  animation: ${animation} 1.4s infinite ease-in-out;
`

const Wrapper = styled.div`
  & ${SpinnerItem}:nth-child(2) {
    animation-delay: 0.2s;
  }

  & ${SpinnerItem}:nth-child(3) {
    animation-delay: 0.4s;
  }
`

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <SpinnerItem></SpinnerItem>
      <SpinnerItem></SpinnerItem>
      <SpinnerItem></SpinnerItem>
    </Wrapper>
  )
}

export default LoadingSpinner
