import styled from "styled-components"
import useOnOutsideClick from "../../../../../hooks/useOnOutsideClick.ts"
import { motion } from "framer-motion"
import Separator from "../../../Sidebar/components/Separator.tsx"
import InviteIcon from "../../../../../shared/svg/InviteIcon.tsx"
import SettingsButton from "../../../../../shared/svg/SettingsButton.tsx"
import UploadFileButton from "../../../../../shared/svg/UploadFileButton.tsx"
import TrashIcon from "../../../../../shared/svg/TrashIcon.tsx"
import EditIcon from "../../../../../shared/svg/EditIcon.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import serverService from "../../../../../services/serverService.ts"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../../../Auth/AuthContext.ts"
import { Server } from "../../../../../../types.ts"
import { useNavigate } from "react-router-dom"
import useOnKeyDown from "../../../../../hooks/useOnKeyDown.ts"
import { KeyCodes } from "../../../../../shared/constants/keycodes.ts"
import { socket } from "../../../../../config/socket.ts"
import { ModalOptions } from "../../../../../hooks/useModal.ts"

const Wrapper = styled.div`
  position: absolute;
  top: 56px;
  left: 10px;
  width: 220px;
  background-color: #111214;
  border-radius: 4px;
  color: #b5bac1;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
  align-items: center;
`

const Button = styled.button<{ $color?: string; $hoverColor?: string }>`
  margin: 2px 0;
  background-color: inherit;
  padding: 6px 8px;
  border-style: none;
  color: ${(props) => (props.$color ? props.$color : "inherit")};
  height: 32px;
  width: 204px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$hoverColor ? props.$hoverColor : "rgb(71, 82, 196)"};
    color: white;
  }
`

const ServerOptionsPopout = ({
  setPopoutOpen,
  editChannel,
  createChannel,
  inviteToServer,
}: {
  setPopoutOpen: (popoutOpen: boolean) => void
  editChannel: ModalOptions
  createChannel: ModalOptions
  inviteToServer: ModalOptions
}) => {
  const { token } = useContext(AuthContext)
  const { serverId } = useParams()
  const ref = useOnOutsideClick(() => setPopoutOpen(false))
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const deleteServerMutation = useMutation({
    mutationFn: () => {
      return serverService.destroy(serverId as string, token as string)
    },
    onSuccess: () => {
      const servers = queryClient.getQueryData(["servers"]) as Server[]
      queryClient.setQueryData(
        ["servers"],
        servers.filter((s) => s.id !== serverId),
      )

      socket.emit("server:delete", serverId)
      setPopoutOpen(false)
      navigate("/channels/@me")
    },
  })

  useOnKeyDown(KeyCodes.ESCAPE, () => setPopoutOpen(false))

  return (
    <>
      <Wrapper
        ref={ref}
        as={motion.div}
        initial={{ scaleX: 0, scaleY: 0 }}
        animate={{ scaleX: 1, scaleY: 1 }}
        transition={{ duration: 0.1 }}
      >
        <InnerWrapper>
          <Button
            $color="#949cf7"
            onClick={() => {
              setPopoutOpen(false)
              inviteToServer.open()
            }}
          >
            Invite People
            <InviteIcon size={18} />
          </Button>

          <Separator type="thin" width={192} style={{ margin: "4px" }} />

          <Button
            onClick={() => {
              setPopoutOpen(false)
              createChannel.open()
            }}
          >
            Create Channel
            <UploadFileButton size={18} />
          </Button>

          <Button>
            Server Settings
            <SettingsButton size={18} />
          </Button>

          <Button
            onClick={() => {
              setPopoutOpen(false)
              editChannel.open()
            }}
          >
            Edit Server
            <EditIcon size={18} />
          </Button>

          <Button
            $color="#f23f42"
            $hoverColor="#f23f42"
            onClick={() => deleteServerMutation.mutate()}
          >
            Delete Server
            <TrashIcon size={18} />
          </Button>
        </InnerWrapper>
      </Wrapper>
    </>
  )
}

export default ServerOptionsPopout
