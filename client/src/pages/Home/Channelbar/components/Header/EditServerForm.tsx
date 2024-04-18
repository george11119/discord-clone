import { useParams } from "react-router-dom"
import { FormEvent, useContext, useId, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import serverService from "../../../../../api/services/serverService.ts"
import { Server } from "../../../../../../types.ts"
import AuthContext from "../../../../Auth/AuthContext.ts"
import styled from "styled-components"
import Tooltip from "../../../../../shared/components/Tooltip.tsx"
import FormInput from "../../../../../shared/components/FormInput.tsx"
import UploadIcon from "../../../../../shared/svg/UploadIcon.tsx"
import Button from "../../../../../shared/components/Button.tsx"

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
  const { token } = useContext(AuthContext)
  const { serverId } = useParams()
  const serverFormId = useId()

  const queryClient = useQueryClient()
  const servers = queryClient.getQueryData(["servers"]) as Server[]
  const server = servers?.find((s) => s.id === serverId)

  const [serverName, setServerName] = useState(server ? server.name : "")

  const editServerMutation = useMutation({
    mutationFn: (updatedServer: { name: string }) => {
      return serverService.update(
        serverId as string,
        updatedServer,
        token as string,
      )
    },
    onSuccess: (editedServer) => {
      const servers = queryClient.getQueryData(["servers"]) as Server[]
      queryClient.setQueryData(
        ["servers"],
        servers.map((s) => (s.id === serverId ? editedServer : s)),
      )

      handleClose()
    },
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (serverName === "") return

    const serverObject = {
      name: serverName,
    }

    editServerMutation.mutate(serverObject)
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
        />
      </Form>
      <Footer>
        <Button
          text="Create"
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
