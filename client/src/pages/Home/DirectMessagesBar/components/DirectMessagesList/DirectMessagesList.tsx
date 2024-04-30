import { DirectMessage } from "../../../../../../types.ts"
import styled from "styled-components"

const Wrapper = styled.div``

const DirectMessagesList = ({
  directMessages,
}: {
  directMessages: DirectMessage[]
}) => {
  return (
    <Wrapper>
      {directMessages.map((dm) => (
        <div>{dm.channelId}</div>
      ))}
    </Wrapper>
  )
}

export default DirectMessagesList
