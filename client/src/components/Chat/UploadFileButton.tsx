import styled from "styled-components"

const Svg = styled.svg`
  padding: 0 16px;
  height: 24px;
  width: 24px;
  fill: none;
  cursor: pointer;
`

const UploadFileButton = ({ size }: { size: number }) => {
  return (
    <Svg
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" fill="transparent" className=""></circle>
      <path
        fill="hsl( 215 calc( 1 * 8.8%) 73.3% / 1)"
        fillRule="evenodd"
        d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-17a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z"
        clipRule="evenodd"
      ></path>
    </Svg>
  )
}

export default UploadFileButton
