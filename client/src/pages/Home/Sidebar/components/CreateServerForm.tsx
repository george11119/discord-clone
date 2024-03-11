import FormInput from "../../../../shared/components/FormInput.tsx"
import styled from "styled-components"
import { FormEvent, useState } from "react"
import UploadIcon from "../../../../shared/svg/UploadIcon.tsx"
import Tooltip from "../../../../shared/components/Tooltip.tsx"

const Form = styled.form`
  padding: 16px;
`

const UploadIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 24px;
`

const CreateServerForm = ({ formId }: { formId: string }) => {
  const [serverName, setServerName] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    console.log(serverName)
  }

  return (
    <Form id={formId} onSubmit={handleSubmit}>
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
  )
}

export default CreateServerForm
