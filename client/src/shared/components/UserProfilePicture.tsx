import styled from "styled-components"
import { useId } from "react"

const Wrapper = styled.div<{ $profileDiameter: number }>`
  position: relative;
  border-radius: 50%;
`

const UserProfilePicture = ({
  profileDiameter,
}: {
  profileDiameter: number
}) => {
  const id = useId()
  const idString = `url(#${id})`
  return (
    <Wrapper $profileDiameter={profileDiameter}>
      <svg style={{ height: profileDiameter, width: profileDiameter }}>
        <mask id={id} width="32" height="32">
          <circle cx="16" cy="16" r="16" fill="white"></circle>
          <rect
            color="black"
            x="19"
            y="19"
            width="16"
            height="16"
            rx="8"
            ry="8"
          ></rect>
        </mask>
        {/*TODO replace with foreign object profile picture*/}
        <circle
          cx={profileDiameter / 2}
          cy={profileDiameter / 2}
          r={profileDiameter / 2}
          fill="red"
          mask={idString}
        />
      </svg>
    </Wrapper>
  )
}

export default UserProfilePicture
