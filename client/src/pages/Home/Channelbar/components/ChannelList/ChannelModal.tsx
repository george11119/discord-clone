import Modal from "../../../../../shared/components/Modal.tsx"
import styled from "styled-components"
import CloseIcon from "../../../../../shared/svg/CloseIcon.tsx"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import ChannelForm from "./ChannelForm.tsx"

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 8px;
`

const Header = styled.div`
  user-select: none;
  padding: 16px;
`

const Title = styled.h1`
  font-size: 19px;
  color: rgb(242, 243, 245);
`

const Text = styled.div`
  margin-top: 2px;
  font-size: 11px;
  line-height: 1.35;
  color: rgb(181, 186, 193);
`
const ChannelModal = ({
  handleClose,
  type,
  initialChannelName,
  channelId,
}: {
  handleClose: () => void
  type: "create" | "edit"
  initialChannelName?: string
  channelId?: string
}) => {
  return (
    <Modal
      style={{ width: 460, borderRadius: "12px" }}
      handleClose={handleClose}
    >
      <CloseButton onClick={handleClose}>
        <CloseIcon size={24} />
      </CloseButton>
      <VerticalSpacer height={8} />
      <Header>
        <Title>{type === "create" ? "Create Channel" : "Edit Channel"}</Title>
        <Text>in General</Text>
      </Header>
      <ChannelForm
        handleClose={handleClose}
        initialChannelName={initialChannelName ? initialChannelName : ""}
        type={type}
        channelId={channelId}
      />
    </Modal>
  )
}

export default ChannelModal
