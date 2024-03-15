import FormInput from "../../../../shared/components/FormInput.tsx"
import styled from "styled-components"
import { FormEvent, useContext, useId, useState } from "react"
import UploadIcon from "../../../../shared/svg/UploadIcon.tsx"
import Tooltip from "../../../../shared/components/Tooltip.tsx"
import Button from "../../../../shared/components/Button.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import serverService from "../../../../services/serverService.ts"
import AuthContext from "../../../Auth/AuthContext.ts"
import { Server } from "../../../../../types.ts"

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

const CreateServerForm = ({
  handleClose,
  initialServerName = "",
}: {
  handleClose: () => void
  initialServerName?: string
}) => {
  const { token } = useContext(AuthContext)
  const serverFormId = useId()
  const [serverName, setServerName] = useState(initialServerName)

  const queryClient = useQueryClient()

  const newServerMutation = useMutation({
    mutationFn: (newServer: { name: string }) => {
      return serverService.create(newServer, token as string)
    },
    onSuccess: (newServer) => {
      const servers: Server[] | undefined = queryClient.getQueryData([
        "servers",
      ])
      queryClient.setQueryData(["servers"], servers?.concat(newServer))

      handleClose()
    },
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (serverName === "") return

    const serverObject = {
      name: serverName,
    }

    newServerMutation.mutate(serverObject)
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
          isLoading={newServerMutation.isPending}
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

export default CreateServerForm
