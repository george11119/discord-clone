import styled from "styled-components"
import Modal from "../../../../shared/components/Modal.tsx"
import CloseIcon from "../../../../shared/svg/CloseIcon.tsx"
import CreateServerForm from "./CreateServerForm.tsx"
import Button from "../../../../shared/components/Button.tsx"
import { useId } from "react"

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 22px;
`

const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`

const Header = styled.div`
  user-select: none;
  padding: 24px;
  padding-bottom: 0;
`

const Text = styled.p`
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  line-height: 1.35;
  color: rgb(181, 186, 193);
`

const Footer = styled.div`
  background-color: rgb(43, 45, 49);
  padding: 16px;
  display: flex;
  justify-content: end;
`
const CreateServerModal = ({ handleClose }: { handleClose: () => void }) => {
  const createServerFormId = useId()

  return (
    <Modal handleClose={handleClose}>
      <CloseButton onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
      <Header>
        <Title>Create Your Server</Title>
        <Text>
          Give your server a personality with a name and an icon. You can always
          change it later
        </Text>
      </Header>
      <CreateServerForm formId={createServerFormId} handleClose={handleClose} />
      <Footer>
        <Button
          text="Create"
          form={createServerFormId}
          style={{
            height: "38px",
            width: "96px",
            marginTop: "0px",
            fontSize: "14px",
          }}
        ></Button>
      </Footer>
    </Modal>
  )
}

export default CreateServerModal
