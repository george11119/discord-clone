import styled from "styled-components"
import { useId } from "react"

const Wrapper = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  height: 16px;
  font-size: 12px;
  font-weight: 700;
`

const Input = styled.input`
  margin-top: 8px;
  padding: 10px;
  background-color: #1e1f22;
  border-radius: 3px;
  box-sizing: border-box;
  height: 40px;
  color: rgb(181, 186, 193);
`

const FormInput = ({
  name,
  type,
  value,
  setValue,
}: {
  name: string
  type: string
  value: string
  setValue: (value: string) => void
}) => {
  const labelId = useId()

  return (
    <Wrapper>
      <Label htmlFor={labelId}>{name.toUpperCase()}: </Label>
      <Input
        type={type}
        id={labelId}
        name={name}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </Wrapper>
  )
}

export default FormInput
