import styled from "styled-components"

const ThickWrapper = styled.div<{ $width?: number | string }>`
  min-height: 2px;
  width: ${(props) => {
    if (!props.$width) return "32px"
    if (typeof props.$width === "number") return `${props.$width}px`
    return props.$width
  }};
  border-radius: 1px;
  background-color: rgba(78, 80, 88, 0.48);
`

const ThinWrapper = styled.div<{ $width?: number | string }>`
  width: ${(props) => {
    if (!props.$width) return "32px"
    if (typeof props.$width === "number") return `${props.$width}px`
    return props.$width
  }};
  background-color: rgba(78, 80, 88, 0.48);
  border-bottom: 1px solid rgba(78, 80, 88, 0.48);
`

const Separator = ({
  width,
  type,
}: {
  width?: number | string
  type: "thick" | "thin"
}) => {
  if (type === "thick") {
    return <ThickWrapper $width={width}></ThickWrapper>
  } else {
    return <ThinWrapper $width={width}></ThinWrapper>
  }
}

export default Separator
