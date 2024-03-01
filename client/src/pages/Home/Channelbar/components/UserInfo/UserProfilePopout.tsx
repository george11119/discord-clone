import styled from "styled-components"
import Separator from "../../../Sidebar/components/Separator.tsx"
import { useContext } from "react"
import AuthContext from "../../../../Auth/AuthContext.ts"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import LogoutButton from "../../../../Auth/LogoutButton.tsx"
import { motion } from "framer-motion"
import useOnOutsideClick from "../../../../../hooks/useOnOutsideClick.ts"
import UserProfilePicture from "../../../../../shared/components/UserProfilePicture.tsx"

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
`

const Banner = styled.div`
  height: 60px;
  background-color: rgb(181, 135, 74);
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
}: {
  setPopoutOpen: (popoutOpen: boolean) => void
}) => {
  const { user } = useContext(AuthContext)

  const ref = useOnOutsideClick(() => setPopoutOpen(false))

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
      <Banner />
      <ProfilePictureBorder>
        <ProfilePictureContainer>
          <UserProfilePicture profileDiameter={80} />
        </ProfilePictureContainer>
      </ProfilePictureBorder>
      <InnerWrapper>
        <BoldText>{user?.username}</BoldText>

        <VerticalSpacer height={12} />
        <Separator width={"auto"} />
        <VerticalSpacer height={12} />

        <div style={{ fontSize: "12px" }}>
          <BoldText style={{ marginBottom: "6px" }}>
            DISCORD MEMBER SINCE
          </BoldText>
          Oct 20, 2020
        </div>

        <VerticalSpacer height={12} />
        <Separator width={"auto"} />
        <VerticalSpacer height={12} />

        <LogoutButton />
      </InnerWrapper>
    </Wrapper>
  )
}

export default UserProfilePopout
