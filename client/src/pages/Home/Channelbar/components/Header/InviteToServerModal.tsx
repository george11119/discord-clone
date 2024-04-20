import Modal from "../../../../../shared/components/Modal.tsx"
import styled from "styled-components"
import CloseIcon from "../../../../../shared/svg/CloseIcon.tsx"
import FormInput from "../../../../../shared/components/FormInput.tsx"
import { FormEvent, useContext, useEffect, useState } from "react"
import Button from "../../../../../shared/components/Button.tsx"
import config from "../../../../../config/config.ts"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"
import serverService from "../../../../../api/services/serverService.ts"

const CloseButton = styled.div`
  position: absolute;
  top: 6px;
  right: 8px;
`

const Container = styled.div`
  width: 460px;
  padding: 16px;
`

const InfoText = styled.div`
  font-size: 11px;
  user-select: none;
  color: rgb(196, 201, 206);
`

const Form = styled.form`
  width: ${349 + 75}px;
  display: grid;
  grid-template-columns: 349px 75px;
`

const CopyLinkButtonWrapper = styled.div`
  margin-top: 28px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(30, 31, 34);
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
`

const InviteToServerModal = ({ handleClose }: { handleClose: () => void }) => {
  const { token } = useContext(AuthContext)
  const { serverId } = useParams()
  const [inviteLink, setInviteLink] = useState(`${config.CLIENT_URL}/join`)
  const [copyButtonClicked, setCopyButtonClicked] = useState(false)

  // so url doesnt get fetched twice in dev mode (vite refreshes page causing another invite link fetch)
  const [called, setCalled] = useState(false)

  useEffect(() => {
    if (!called) {
      serverService
        .getInviteLink(token as string, serverId as string)
        .then(({ code }) => {
          setInviteLink(`${inviteLink}/${code}`)
          setCalled(true)
        })
    }
  }, [])

  const copyLinkToClipboard = async (e: FormEvent) => {
    e.preventDefault()
    await navigator.clipboard.writeText(inviteLink)
  }

  return (
    <Modal handleClose={handleClose} style={{ width: 460 }}>
      <CloseButton onClick={handleClose}>
        <CloseIcon size={24} />
      </CloseButton>
      <Container>
        <Form onSubmit={copyLinkToClipboard}>
          <FormInput
            name="Send a server invite link to a friend"
            type="text"
            value={inviteLink}
            setValue={setInviteLink}
            style={{
              width: 349,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
              marginTop: 12,
              fontSize: 15,
            }}
            wrapperStyle={{ marginBottom: 12 }}
            readOnly
          />
          <CopyLinkButtonWrapper>
            <Button
              text={copyButtonClicked ? "Copied" : "Copy"}
              style={{
                margin: 0,
                fontSize: 13,
                height: 32,
                width: 75,
                marginRight: 4,
                backgroundColor: copyButtonClicked
                  ? "rgb(28, 141, 26)"
                  : "rgb(88, 101, 242)",
              }}
              onClick={() => setCopyButtonClicked(true)}
            />
          </CopyLinkButtonWrapper>
        </Form>
        <InfoText>Your invite link expires in 7 days.</InfoText>
      </Container>
    </Modal>
  )
}

export default InviteToServerModal
