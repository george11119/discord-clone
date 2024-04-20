import styled from "styled-components"
import { FormEvent, useId, useState } from "react"
import { useParams } from "react-router-dom"
import channelQueries from "../../../../../api/queries/channelQueries.ts"
import FormInput from "../../../../../shared/components/FormInput.tsx"
import Button from "../../../../../shared/components/Button.tsx"

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
  const { serverId } = useParams()

  const channelFormId = useId()
  const [channelName, setChannelName] = useState(initialChannelName)

  const newChannelMutation = channelQueries.useCreateChannel(serverId)
  const editChannelMutation = channelQueries.useEditChannel(serverId, channelId)

  const mutator = type === "create" ? newChannelMutation : editChannelMutation

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (channelName === "") return

    const channelObject = {
      name: channelName,
    }

    mutator.mutate(channelObject)
    handleClose()
  }

  const deleteChannelMutation = channelQueries.useDeleteChannel(
    serverId,
    channelId,
  )

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
          autoFocus
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
            onClick={() => {
              deleteChannelMutation.mutate()
              handleClose()
            }}
            onMouseOver={() => setDeleteButtonHovered(true)}
            onMouseOut={() => setDeleteButtonHovered(false)}
          />
        )}
        <Button
          text={type === "create" ? "Create Channel" : "Edit Channel"}
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

export default ChannelForm
