import FormInput from "../../../../shared/components/FormInput.tsx"
import styled from "styled-components"
import { FormEvent, useId, useState } from "react"
import UploadIcon from "../../../../shared/svg/UploadIcon.tsx"
import Tooltip from "../../../../shared/components/Tooltip.tsx"
import Button from "../../../../shared/components/Button.tsx"

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
  createServer,
}: {
  handleClose: () => void
  createServer: (serverObject: { name: string }) => Promise<void>
}) => {
  const createServerFormId = useId()
  const [isLoading, setIsLoading] = useState(false)
  const [serverName, setServerName] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const serverObject = {
      name: serverName,
    }

    setIsLoading(true)
    await createServer(serverObject)

    setIsLoading(false)
    handleClose()
  }

  return (
    <>
      <Form id={createServerFormId} onSubmit={handleSubmit}>
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
          isLoading={isLoading}
          form={createServerFormId}
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
