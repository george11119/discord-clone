import Backdrop from "./Backdrop.tsx"
import styled from "styled-components"
import { motion } from "framer-motion"
import CloseIcon from "../svg/CloseIcon.tsx"
import CreateServerForm from "../../pages/Home/Sidebar/components/CreateServerForm.tsx"
import Button from "./Button.tsx"
import { useId } from "react"

const modalAnimation = {
  hidden: {
    transform: "scale(0)",
    opacity: 0,
    transition: {
      delay: 0.25,
    },
  },
  visible: {
    transform: " scale(1)",
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    transform: "scale(0)",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
}

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 22px;
`

const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`

const Header = styled.div`
  user-select: none;
  padding: 24px;
  padding-bottom: 0;
`

const Text = styled.p`
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  line-height: 1.35;
  color: rgb(181, 186, 193);
`

const Wrapper = styled.div`
  width: 440px;
  background-color: rgb(49, 51, 56);
  box-shadow:
    rgba(30, 31, 34, 0.6) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
  border-radius: 4px;
  position: relative;
`

const Footer = styled.div`
  background-color: rgb(43, 45, 49);
  padding: 16px;
  display: flex;
  justify-content: end;
`

const Modal = ({ handleClose }: { handleClose: () => void }) => {
  const createServerFormId = useId()

  return (
    <Backdrop onClick={handleClose}>
      <Wrapper
        as={motion.div}
        onClick={(e) => e.stopPropagation()}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <Header>
          <Title>Create Your Server</Title>
          <Text>
            Give your server a personality with a name and an icon. You can
            always change it later
          </Text>
        </Header>
        <CreateServerForm formId={createServerFormId} />
        <Footer>
          <Button
            text="Create"
            form={createServerFormId}
            style={{
              height: "38px",
              width: "96px",
              marginTop: "0px",
              fontSize: "14px",
            }}
          ></Button>
        </Footer>
      </Wrapper>
    </Backdrop>
  )
}

export default Modal
