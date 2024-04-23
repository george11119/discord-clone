import styled from "styled-components"
import LoadingSpinner from "../../svg/LoadingSpinner.tsx"
import { User } from "../../../../types.ts"
import { useQuery } from "@tanstack/react-query"
import userService from "../../../api/services/userService.ts"
import { FormEvent, useContext, useState } from "react"
import AuthContext from "../../../pages/Auth/AuthContext.ts"
import { stringToColor } from "../../../utils/stringToColor.ts"
import UserProfilePicture from "../UserProfilePicture.tsx"
import VerticalSpacer from "../VerticalSpacer.tsx"
import Separator from "../../../pages/Home/Sidebar/components/Separator.tsx"
import { dateFormatter } from "../../../utils/dateTime.ts"
import AddIcon from "../../svg/AddIcon.tsx"
import { motion } from "framer-motion"
import useOnKeyDown from "../../../hooks/useOnKeyDown.ts"
import { KeyCodes } from "../../constants/keycodes.ts"

const LoadingSpinnerWrapper = styled.div`
  height: 32px;
  width: 32px;
  padding: 8px;
  background-color: #2b2d31;
`

const Wrapper = styled.div`
  width: 340px;
  background-color: rgb(35, 36, 40);
  flex-direction: column;
  border-radius: 8px;
  line-height: 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 8px 16px 0px;
  color: rgb(219, 222, 225);
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
`

const BoldText = styled.div`
  font-weight: 600;
`

const RoleContainer = styled.div`
  height: 14px;
  padding: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  background-color: #232428;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 11px;
`

const NoteContainer = styled.div`
  font-size: 11px;
  padding: 4px;
  height: 28px;
  max-height: 88px;
  line-height: 14px;
`

const Form = styled.form``

const Input = styled.input`
  color: rgb(219, 222, 225);
  background-color: inherit;
  height: 20px;
  padding: 10px;
  border: 1px solid rgb(40, 40, 41);
  max-width: 263px;
  border-radius: 3px;
`

const UserInfoPopout = ({
  user,
  setIsOpen,
  position,
}: {
  user: User
  setIsOpen: (x: boolean) => void
  position: "left" | "right"
}) => {
  const { token, user: currentUser } = useContext(AuthContext)
  const [message, setMessage] = useState("")

  const result = useQuery({
    queryKey: [`user`, `${user.id}`],
    queryFn: () => userService.getOne(token as string, user.id),
    staleTime: 60 * 1000,
  })

  useOnKeyDown(KeyCodes.ESCAPE, () => setIsOpen(false))

  if (result.isLoading) {
    return (
      <LoadingSpinnerWrapper>
        <LoadingSpinner size={32} />
      </LoadingSpinnerWrapper>
    )
  }

  const fetchedUser = result.data

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    // TODO redirect user to dm page and send the message to them
    console.log(`Message sent: ${message}`)
    setMessage("")
  }

  return (
    <Wrapper
      as={motion.div}
      initial={{ translateX: position === "left" ? "-12px" : "12px" }}
      animate={{ translateX: "0px" }}
      transition={{
        duration: 0.12,
      }}
    >
      <Banner
        $backgroundColor={stringToColor(fetchedUser.username as string)}
      />
      <ProfilePictureBorder>
        <ProfilePictureContainer>
          <UserProfilePicture profileDiameter={80} user={user} />
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

        <div style={{ fontSize: "12px" }}>
          <BoldText style={{ marginBottom: "8px" }}>ROLE</BoldText>
          <div style={{ display: "flex" }}>
            <RoleContainer>Member</RoleContainer>
            <RoleContainer
              style={{ cursor: "pointer" }}
              onClick={() => alert("Not implemented")}
            >
              <AddIcon size={14} />
            </RoleContainer>
          </div>
        </div>

        <VerticalSpacer height={12} />

        <div style={{ fontSize: "12px" }}>
          <BoldText style={{ marginBottom: "8px" }}>NOTE</BoldText>
          <NoteContainer>note</NoteContainer>
        </div>

        {currentUser?.id !== user.id && (
          <Form onSubmit={onSubmit}>
            <Input
              placeholder={`Message @${user.username}`}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form>
        )}
      </InnerWrapper>
      <VerticalSpacer height={1} />
    </Wrapper>
  )
}

export default UserInfoPopout
