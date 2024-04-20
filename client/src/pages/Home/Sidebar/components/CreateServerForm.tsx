import FormInput from "../../../../shared/components/FormInput.tsx"
import styled from "styled-components"
import { FormEvent, useId, useState } from "react"
import UploadIcon from "../../../../shared/svg/UploadIcon.tsx"
import Tooltip from "../../../../shared/components/Tooltip.tsx"
import Button from "../../../../shared/components/Button.tsx"
import serverQueries from "../../../../api/queries/serverQueries.ts"

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
  const serverFormId = useId()
  const [serverName, setServerName] = useState(initialServerName)

  const newServerMutation = serverQueries.useCreateServer()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (serverName === "") return

    const serverObject = {
      name: serverName,
    }

    newServerMutation.mutate(serverObject)
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
          data-testid="new-server-name"
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
