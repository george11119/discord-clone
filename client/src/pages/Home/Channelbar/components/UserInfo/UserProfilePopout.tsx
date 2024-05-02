import styled from "styled-components"
import Separator from "../../../Sidebar/components/Separator.tsx"
import { MutableRefObject, useContext, useEffect, useRef } from "react"
import AuthContext from "../../../../Auth/AuthContext.ts"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import LogoutButton from "../../../../Auth/components/LogoutButton.tsx"
import { motion } from "framer-motion"
import UserProfilePicture from "../../../../../shared/components/UserProfilePicture.tsx"
import useOnKeyDown from "../../../../../hooks/useOnKeyDown.ts"
import { KeyCodes } from "../../../../../shared/constants/keycodes.ts"
import { stringToColor } from "../../../../../utils/stringToColor.ts"
import { dateFormatter } from "../../../../../utils/dateTime.ts"

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(calc(-100% - 8px)) translateX(-32px);
  width: 340px;
  background-color: rgb(35, 36, 40);
  flex-direction: column;
  border-radius: 8px;
  max-height: 800px;
  z-index: 2;
  line-height: 16px;
`

const Banner = styled.div<{ $backgroundColor?: string }>`
  height: 60px;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "#242428"};
  border-radius: 8px 8px 0 0;
`

const ProfilePictureBorder = styled.div`
  height: 92px;
  width: 92px;
  position: absolute;
  left: 16px;
  top: 10px;
  border-radius: 50%;
  background-color: rgb(35, 36, 40);
`

const ProfilePictureContainer = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 58px 16px 16px 16px;
  border-radius: 8px;
  background-color: rgb(17, 18, 20);
  padding: 12px;
  max-height: 700px;
`

const BoldText = styled.div`
  font-weight: 600;
`

const UserProfilePopout = ({
  setPopoutOpen,
  userInfoRef,
}: {
  setPopoutOpen: (popoutOpen: boolean) => void
  userInfoRef: MutableRefObject<HTMLDivElement | null>
}) => {
  const { user } = useContext(AuthContext)

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleRightClick = (e: Event) => {
      if (
        !ref.current?.contains(e.target as Node) &&
        !userInfoRef.current?.contains(e.target as Node)
      ) {
        setPopoutOpen(false)
      }
    }

    document.addEventListener("contextmenu", handleRightClick)

    return () => {
      document.removeEventListener("contextmenu", handleRightClick)
    }
  }, [ref, userInfoRef])

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (
        !ref.current?.contains(e.target as Node) &&
        !userInfoRef.current?.contains(e.target as Node)
      ) {
        setPopoutOpen(false)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [ref, userInfoRef])

  useOnKeyDown(KeyCodes.ESCAPE, () => setPopoutOpen(false))

  return (
    <Wrapper
      ref={ref}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.08,
      }}
    >
      <Banner $backgroundColor={stringToColor(user?.username as string)} />
      <ProfilePictureBorder>
        <ProfilePictureContainer>
          <UserProfilePicture
            profileDiameter={80}
            user={user}
            canClickProfile={true}
          />
        </ProfilePictureContainer>
      </ProfilePictureBorder>
      <InnerWrapper>
        <BoldText>{user?.username}</BoldText>

        <VerticalSpacer height={12} />
        <Separator type="thick" width={"auto"} />
        <VerticalSpacer height={12} />

        <div style={{ fontSize: "12px" }}>
          <BoldText style={{ marginBottom: "6px" }}>
            DISCORD MEMBER SINCE
          </BoldText>
          {dateFormatter(user?.createdAt as Date, "MMMM d, yyyy")}
        </div>

        <VerticalSpacer height={12} />
        <Separator type="thick" width={"auto"} />
        <VerticalSpacer height={12} />

        <LogoutButton />
      </InnerWrapper>
    </Wrapper>
  )
}

export default UserProfilePopout
