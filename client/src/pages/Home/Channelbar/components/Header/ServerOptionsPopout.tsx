import styled from "styled-components"
import useOnOutsideClick from "../../../../../hooks/useOnOutsideClick.ts"
import { motion } from "framer-motion"
import Separator from "../../../Sidebar/components/Separator.tsx"
import InviteIcon from "../../../../../shared/svg/InviteIcon.tsx"
import SettingsButton from "../UserInfo/SettingsButton.tsx"
import UploadFileButton from "../../../Chat/components/UploadFileButton.tsx"

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

const Button = styled.button<{ $color?: string }>`
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
  font-size: 13px;
  border-radius: 3px;

  &:hover {
    background-color: rgb(71, 82, 196);
    color: white;
  }
`

const ServerOptionsPopout = ({
  setPopoutOpen,
}: {
  setPopoutOpen: (popoutOpen: boolean) => void
}) => {
  const ref = useOnOutsideClick(() => setPopoutOpen(false))

  return (
    <Wrapper
      ref={ref}
      as={motion.div}
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.1 }}
    >
      <InnerWrapper>
        <Button color="#949cf7">
          <div>Invite People</div>
          <InviteIcon size={18} />
        </Button>
        <Separator type="thin" width={192} style={{ margin: "4px" }} />
        <Button>
          <div>Create Channel</div>
          <UploadFileButton size={18} />
        </Button>
        <Button>
          <div>Server Settings</div>
          <SettingsButton size={18} />
        </Button>
      </InnerWrapper>
    </Wrapper>
  )
}

export default ServerOptionsPopout
