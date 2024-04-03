import styled from "styled-components"
import { useId } from "react"

const Wrapper = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label<{ $isError: boolean }>`
  color: ${(props) => (props.$isError ? "rgb(250, 119, 124)" : "inherit")};
  height: 16px;
  font-size: 12px;
  font-weight: 700;
`

const ErrorSpan = styled.span`
  color: rgb(250, 119, 124);
  height: 16px;
  font-size: 12px;
  font-weight: 400;
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
  errorText,
  showErrorText = false,
  labelStyle,
  placeholder,
  ...rest
}: {
  name: string
  type: string
  value: string
  setValue: (value: string) => void
  errorText?: string
  showErrorText?: boolean
  labelStyle?: any
  placeholder?: string
  [rest: string]: any
}) => {
  const labelId = useId()

  return (
    <Wrapper>
      <Label $isError={showErrorText} htmlFor={labelId} style={labelStyle}>
        {name.toUpperCase()}{" "}
      </Label>
      {showErrorText && <ErrorSpan> - {errorText}</ErrorSpan>}
      <Input
        type={type}
        id={labelId}
        name={name}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        placeholder={placeholder ? placeholder : ""}
        {...rest}
      />
    </Wrapper>
  )
}

export default FormInput
