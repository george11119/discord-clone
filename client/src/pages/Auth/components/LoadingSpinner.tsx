import styled, {keyframes} from "styled-components"

const Wrapper = styled.div``

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

const SpinnerItem1 = styled.span`
  width: 6px;
  height: 6px;
  margin-right: 2px;
  background-color: white;
  border-radius: 3px;
  display: inline-block;
  opacity: 0.3;
  animation: ${animation} 1.4s infinite ease-in-out;
`

const SpinnerItem2 = styled.span`
  width: 6px;
  height: 6px;
  margin-right: 2px;
  background-color: white;
  border-radius: 3px;
  display: inline-block;
  opacity: 0.3;
  animation: ${animation} 1.4s infinite ease-in-out;
  animation-delay: 0.2s;
`

const SpinnerItem3 = styled.span`
  width: 6px;
  height: 6px;
  margin-right: 2px;
  background-color: white;
  border-radius: 3px;
  display: inline-block;
  opacity: 0.3;
  animation: ${animation} 1.4s infinite ease-in-out;
  animation-delay: 0.4s;
`

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <SpinnerItem1></SpinnerItem1>
      <SpinnerItem2></SpinnerItem2>
      <SpinnerItem3></SpinnerItem3>
    </Wrapper>
  )
}

export default LoadingSpinner
