import styled from "styled-components"
import { useId } from "react"
import Tooltip from "./Tooltip.tsx"

const Wrapper = styled.div<{ $profileDiameter: number }>`
  position: relative;
  border-radius: 50%;
`

const StatusIcon = styled.svg<{ $translateDistance: number }>`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(${(props) => props.$translateDistance}px)
    translateY(${(props) => props.$translateDistance}px);
`

const UserProfilePicture = ({
  profileDiameter,
}: {
  profileDiameter: number
}) => {
  const id = useId()
  const idString = `url(#${id})`

  // css positioning is hard :(
  // this is disgusting looking but i probably will also never refactor

  // dimensions of the status icon
  const statusSize =
    profileDiameter > 60 ? profileDiameter * 0.2 : profileDiameter * 0.3125

  // dimensions of the status icon border
  const maskSize =
    profileDiameter > 60
      ? profileDiameter * 0.3125
      : profileDiameter * 0.3125 + 4

  // middle of the status icon border
  const maskTranslateDistance =
    profileDiameter > 60
      ? profileDiameter * 0.65 + 3
      : profileDiameter * 0.65 - 1

  // middle of the status icon
  const statusIconTranslateDistance =
    profileDiameter > 60 ? profileDiameter * 0.75 : profileDiameter * 0.6875

  return (
    <Wrapper $profileDiameter={profileDiameter}>
      <svg
        style={{
          height: profileDiameter,
          width: profileDiameter,
        }}
      >
        <mask id={id} width="16" height="16">
          <circle
            cx={profileDiameter / 2}
            cy={profileDiameter / 2}
            r={profileDiameter / 2}
            fill="white"
          ></circle>
          <rect
            color="black"
            x={maskTranslateDistance}
            y={maskTranslateDistance}
            width={maskSize}
            height={maskSize}
            rx={profileDiameter / 4}
            ry={profileDiameter / 4}
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
      <Tooltip tooltip="Do not disturb" placement="top" fontSize={14}>
        <StatusIcon
          style={{ height: statusSize, width: statusSize }}
          $translateDistance={statusIconTranslateDistance}
        >
          <circle
            cx={statusSize / 2}
            cy={statusSize / 2}
            r={statusSize / 2}
            fill="rgb(242, 63, 67)"
          ></circle>
        </StatusIcon>
      </Tooltip>
    </Wrapper>
  )
}

export default UserProfilePicture
