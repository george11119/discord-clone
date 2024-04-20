import { useParams } from "react-router-dom"
import { FormEvent, useId, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Server } from "../../../../../../types.ts"
import styled from "styled-components"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"
import FormInput from "../../../../../shared/components/FormInput.tsx"
import UploadIcon from "../../../../../shared/svg/UploadIcon.tsx"
import Button from "../../../../../shared/components/Button.tsx"
import serverQueries from "../../../../../api/queries/serverQueries.ts"

const Form = styled.form`
  padding: 16px;
`

const UploadIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 24px;
`

const Footer = styled.div`
  background-color: rgb(43, 45, 49);
  padding: 16px;
  display: flex;
  justify-content: end;
`

const EditServerForm = ({ handleClose }: { handleClose: () => void }) => {
  const { serverId } = useParams()
  const serverFormId = useId()

  const queryClient = useQueryClient()
  const servers = queryClient.getQueryData(["servers"]) as Server[]
  const server = servers?.find((s) => s.id === serverId)

  const [serverName, setServerName] = useState(server ? server.name : "")

  const editServerMutation = serverQueries.useEditServer(serverId)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (serverName === "") return

    const serverObject = {
      name: serverName,
    }

    editServerMutation.mutate(serverObject)
    handleClose()
  }

  return (
    <>
      <Form id={serverFormId} onSubmit={handleSubmit}>
        <UploadIconContainer>
          <Tooltip tooltip="Not implemented yet" placement="top">
            <UploadIcon />
          </Tooltip>
        </UploadIconContainer>
        <FormInput
          name="Server name"
          type="text"
          value={serverName}
          setValue={setServerName}
          autoFocus
          data-testid="edit-server-name"
        />
      </Form>
      <Footer>
        <Button
          text="Edit"
          isLoading={editServerMutation.isPending}
          form={serverFormId}
          style={{
            height: "38px",
            width: "96px",
            marginTop: "0px",
            fontSize: "14px",
          }}
        ></Button>
      </Footer>
    </>
  )
}

export default EditServerForm
