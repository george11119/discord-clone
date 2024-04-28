import styled from "styled-components"

const Svg = styled.svg<{ $hoverColor: string; $color: string }>`
  color: ${(props) => props.$color};
  padding: 4px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.$hoverColor};
  }
`

const CloseIcon = ({
  size,
  fill,
  hoverColor,
}: {
  size: number
  fill?: string
  hoverColor?: string
}) => {
  return (
    <Svg
      $color={fill ? fill : "#73767d"}
      $hoverColor={hoverColor ? hoverColor : "rgb(219, 222, 225)"}
      aria-hidden="true"
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        fill={fill ? fill : "currentColor"}
        d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
      ></path>
    </Svg>
  )
}

export default CloseIcon
