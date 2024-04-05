import styled from "styled-components"
import { useContext } from "react"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import messageService from "../../../../../services/messageService.ts"
import { Message } from "../../../../../../types.ts"
import TrashIcon from "../../../../../shared/svg/TrashIcon.tsx"
import EditIcon from "../../../../../shared/svg/EditIcon.tsx"

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
  const { token } = useContext(AuthContext)
  const { channelId } = useParams()
  const queryClient = useQueryClient()

  const deleteMessageMutation = useMutation({
    mutationFn: () => {
      return messageService.destroy(
        token as string,
        channelId as string,
        messageId,
      )
    },
    onSuccess: () => {
      const messages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      queryClient.setQueryData(
        [`messages-${channelId}`],
        messages.filter((m) => m.id !== messageId),
      )
    },
  })

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
