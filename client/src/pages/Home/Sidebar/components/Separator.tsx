import styled from "styled-components"

const Wrapper = styled.div<{ $width?: number | string }>`
  min-height: 2px;
  width: ${(props) => {
    if (!props.$width) return "32px"
    if (typeof props.$width === "number") return `${props.$width}px`
    return props.$width
  }};
  border-radius: 1px;
  background-color: rgba(78, 80, 88, 0.48);
`

const Separator = ({ width }: { width?: number | string }) => {
  return <Wrapper $width={width}></Wrapper>
}

export default Separator
