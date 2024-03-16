import styled from "styled-components"
import Modal from "../../../../../shared/components/Modal.tsx"
import CloseIcon from "../../../../../shared/svg/CloseIcon.tsx"
import EditServerForm from "./EditServerForm.tsx"

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

const CreateServerModal = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Modal handleClose={handleClose}>
      <CloseButton onClick={handleClose}>
        <CloseIcon size={24} />
      </CloseButton>
      <Header>
        <Title>Edit Server</Title>
      </Header>
      <EditServerForm handleClose={handleClose} />
    </Modal>
  )
}

export default CreateServerModal
