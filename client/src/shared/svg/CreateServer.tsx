import styled from "styled-components"
import { LinkWrapper } from "../../pages/Home/Sidebar/components/Icon.tsx"

const Svg = styled.svg`
  color: #23a559;
  transition-duration: 0.15s;

  ${LinkWrapper}:hover & {
    color: white;
  }
`

const CreateServer = () => {
  return (
    <Svg
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5Z"
      ></path>
    </Svg>
  )
}

export default CreateServer
