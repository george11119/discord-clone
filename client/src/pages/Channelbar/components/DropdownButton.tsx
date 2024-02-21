import styled from "styled-components"

const Svg = styled.svg`
  margin-right: 2px;
`

const DropdownButton = ({ size }: { size: number }) => {
  return (
    <Svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z"
        className=""
      ></path>
    </Svg>
  )
}

export default DropdownButton
