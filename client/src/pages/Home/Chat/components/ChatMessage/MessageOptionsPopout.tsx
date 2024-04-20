import styled from "styled-components"
import { useParams } from "react-router-dom"
import TrashIcon from "../../../../../shared/svg/TrashIcon.tsx"
import EditIcon from "../../../../../shared/svg/EditIcon.tsx"
import messageQueries from "../../../../../api/queries/messageQueries.ts"

const PopoutWrapper = styled.div`
  position: absolute;
  top: -16px;
  right: 0;
  margin-right: 14px;
  margin-left: 32px;
  height: 32px;
  background-color: rgb(49, 51, 56);
  box-shadow: rgba(2, 2, 2, 0.15) 0px 0px 0px 1px;
  display: flex;
  border-radius: 4px;
`

const IconWrapper = styled.div<{ $type?: string }>`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) =>
      props.$type === "delete" ? "#f23f42" : "rgba(78, 80, 88, 0.3)"};
  }
`

// TODO add tooltips to icon wrappers
const MessageOptionsPopout = ({
  messageId,
  setBeingEditted,
}: {
  messageId: string
  setBeingEditted: (beingEditted: boolean) => void
}) => {
  const { channelId } = useParams()

  const deleteMessageMutation = messageQueries.useDeleteMessage(
    channelId,
    messageId,
  )

  return (
    <PopoutWrapper>
      <IconWrapper
        $type="delete"
        onClick={() => deleteMessageMutation.mutate()}
      >
        <TrashIcon size={20} />
      </IconWrapper>

      <IconWrapper onClick={() => setBeingEditted(true)}>
        <EditIcon size={20} />
      </IconWrapper>
    </PopoutWrapper>
  )
}

export default MessageOptionsPopout
