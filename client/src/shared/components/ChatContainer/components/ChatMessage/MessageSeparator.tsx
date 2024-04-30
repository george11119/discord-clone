import styled from "styled-components"
import Separator from "../../../../../pages/Home/Sidebar/components/Separator.tsx"
import { dateFormatter } from "../../../../../utils/dateTime.ts"

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  line-height: 13px;
  font-size: 11px;
  color: rgb(148, 155, 164);
  align-items: center;
`

const DateSpan = styled.span`
  user-select: none;
  padding: 4px;
  margin-top: -1px;
  font-weight: 600;
`

const MessageSeparator = ({ date }: { date: Date }) => {
  return (
    <DateContainer>
      <Separator
        type="thin"
        width={"calc(100% - 16px)"}
        style={{ marginLeft: 16 }}
      />
      <DateSpan>{dateFormatter(date, "MMMM dd yyyy")}</DateSpan>
      <Separator
        type="thin"
        width={"calc(100% - 14px)"}
        style={{ marginRight: 14 }}
      />
    </DateContainer>
  )
}

export default MessageSeparator
