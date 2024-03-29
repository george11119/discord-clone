import styled from "styled-components"

const Svg = styled.svg`
  color: #73767d;
  padding: 4px;
  cursor: pointer;
  transition-duration: 0.3s;

  &:hover {
    color: rgb(219, 222, 225);
  }
`

const CloseIcon = ({ size, fill }: { size: number; fill?: string }) => {
  return (
    <Svg
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
