import styled from "styled-components"
import { CSSProperties } from "react"

const Wrapper = styled.div`
  height: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: rgb(218, 55, 60);
  color: white;
  font-weight: 600;
`

const NumberBadge = ({
  count,
  style = {},
}: {
  count: number
  style?: CSSProperties
}) => {
  const styles: CSSProperties = { ...style, width: 10 + `${count}`.length * 6 }
  return <Wrapper style={styles}>{count}</Wrapper>
}

export default NumberBadge
