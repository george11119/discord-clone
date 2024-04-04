import Modal from "../../../../../shared/components/Modal.tsx"
import styled from "styled-components"
import CloseIcon from "../../../../../shared/svg/CloseIcon.tsx"
import VerticalSpacer from "../../../../../shared/components/VerticalSpacer.tsx"
import { FormEvent, useContext, useId, useState } from "react"
import FormInput from "../../../../../shared/components/FormInput.tsx"
import Button from "../../../../../shared/components/Button.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import channelService from "../../../../../services/channelService.ts"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"

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

const Form = styled.form`
  padding: 12px;
  padding-top: 0;
`

const Footer = styled.div`
  background-color: rgb(43, 45, 49);
  padding: 16px;
  display: flex;
  justify-content: end;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  gap: 8px;
`

const ChannelForm = ({
  handleClose,
  initialChannelName = "",
  type,
  channelId,
}: {
  handleClose: () => void
  initialChannelName?: string
  type: "create" | "edit"
  channelId?: string
}) => {
  const [deleteButtonHovered, setDeleteButtonHovered] = useState(false)
  const { token } = useContext(AuthContext)
  const { serverId } = useParams()

  const channelFormId = useId()
  const [channelName, setChannelName] = useState(initialChannelName)

  const queryClient = useQueryClient()

  const newChannelMutation = useMutation({
    mutationFn: (newChannel: { name: string }) => {
      return channelService.create(
        token as string,
        serverId as string,
        newChannel,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`channels`],
      })
      handleClose()
    },
  })

  const editChannelMutation = useMutation({
    mutationFn: (newChannel: { name: string }) => {
      return channelService.update(
        token as string,
        serverId as string,
        channelId as string,
        newChannel,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`channels`],
      })
      handleClose()
    },
  })

  const mutator = type === "create" ? newChannelMutation : editChannelMutation

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (channelName === "") return

    const channelObject = {
      name: channelName,
    }

    mutator.mutate(channelObject)
  }

  const deleteChannelMutation = useMutation({
    mutationFn: () => {
      return channelService.destroy(
        token as string,
        serverId as string,
        channelId as string,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`channels`],
      })
      handleClose()
    },
  })

  return (
    <>
      <Form id={channelFormId} onSubmit={handleSubmit}>
        <FormInput
          name="Channel Name"
          type="text"
          value={channelName}
          setValue={setChannelName}
          labelStyle={{ color: "rgb(219, 222, 225)" }}
          placeholder="new-channel"
        />
      </Form>
      <Footer>
        {type === "edit" && (
          <Button
            text="Delete Channel"
            isLoading={deleteChannelMutation.isPending}
            style={{
              height: "38px",
              backgroundColor: deleteButtonHovered
                ? "rgb(161, 40, 40)"
                : "rgb(218, 55, 60)",
              marginTop: "0px",
              fontSize: "14px",
              width: "125px",
            }}
            onClick={() => deleteChannelMutation.mutate()}
            onMouseOver={() => setDeleteButtonHovered(true)}
            onMouseOut={() => setDeleteButtonHovered(false)}
          />
        )}
        <Button
          text="Create Channel"
          isLoading={mutator.isPending}
          form={channelFormId}
          style={{
            height: "38px",
            width: "125px",
            marginTop: "0px",
            fontSize: "14px",
          }}
        ></Button>
      </Footer>
    </>
  )
}

export default ChannelModal
