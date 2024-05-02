import styled from "styled-components"
import { useId, useState } from "react"
// import Tooltip from "./Tooltip.tsx"
import DiscordIcon from "../../pages/Auth/assets/DiscordIcon.tsx"
import { stringToColor } from "../../utils/stringToColor.ts"
import { User } from "../../../types.ts"

const Wrapper = styled.div`
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

const ProfileImage = styled.div<{ $canClickProfile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$canClickProfile ? "pointer" : "cursor")};

  &:hover {
    opacity: ${(props) => (props.$canClickProfile ? "0.2" : "1")};
    transition-duration: 0.15s;
  }
`

const ViewProfileText = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  text-align: center;
  pointer-events: none;
`

const UserProfilePicture = ({
  profileDiameter,
  user,
  canClickProfile,
}: {
  profileDiameter: number
  user: User | null
  canClickProfile?: boolean
}) => {
  const color = user ? stringToColor(user.username) : "#5865f2"
  const id = useId()
  const idString = `url(#${id})`
  const [hovered, setHovered] = useState(false)

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
    <>
      <Wrapper
        onClick={() => {
          if (!canClickProfile) return
        }}
      >
        <svg
          style={{
            height: profileDiameter,
            width: profileDiameter,
          }}
          onMouseEnter={() => (canClickProfile ? setHovered(true) : null)}
          onMouseLeave={() => (canClickProfile ? setHovered(false) : null)}
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
          <foreignObject
            width={profileDiameter}
            height={profileDiameter}
            x={0}
            y={0}
            mask={idString}
          >
            {/*TODO Replace this with a img tag that contains user profile image*/}
            <ProfileImage
              $canClickProfile={hovered ? true : false}
              style={{
                height: profileDiameter,
                width: profileDiameter,
                backgroundColor: color,
              }}
            >
              <DiscordIcon size={profileDiameter * 0.6} />
            </ProfileImage>
            {canClickProfile && hovered && (
              <ViewProfileText
                style={{
                  fontSize: profileDiameter * 0.15,
                  height: profileDiameter,
                  width: profileDiameter,
                }}
              >
                View Profile
              </ViewProfileText>
            )}
          </foreignObject>
        </svg>
        {/*<Tooltip tooltip="Do not disturb" placement="left" fontSize={14}>*/}
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
        {/*</Tooltip>*/}
      </Wrapper>
    </>
  )
}

export default UserProfilePicture
