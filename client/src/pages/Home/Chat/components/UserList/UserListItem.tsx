import { User } from "../../../../../../types.ts"
import styled from "styled-components"
import DiscordIcon from "../../../../Auth/assets/DiscordIcon.tsx"
import { stringToColor } from "../../../../../utils/stringToColor.ts"
import PopoutContainer from "../../../../../shared/components/PopoutContainer.tsx"
import { useRef, useState } from "react"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: rgb(148, 155, 164);
  height: 42px;
  margin: 1px 0px 1px 8px;
  font-size: 15px;
  width: 208px;
  padding: 1px 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: rgb(229, 232, 235);
    background-color: #404249;
  }
`

const Img = styled.div<{ $backgroundColor: string }>`
  min-height: 32px;
  max-height: 32px;
  min-width: 32px;
  max-width: 32px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "#5865f2"};
  display: flex;
  justify-content: center;
  align-items: center;
`

const PopoutWrapper = styled.div`
  isolation: isolate;
`

const Popout = () => {
  return (
    <PopoutWrapper
      style={{ height: 100, width: 100, backgroundColor: "red" }}
    ></PopoutWrapper>
  )
}

const UserListItem = ({ user }: { user: User }) => {
  const color = stringToColor(user.username)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <PopoutContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        placement="left-start"
        popout={<Popout />}
        modifiers={[
          { name: "offset", options: { offset: [0, 10] } },
          {
            name: "preventOverflow",
            options: {
              padding: {
                top: 48,
              },
              tether: false,
            },
          },
        ]}
      >
        <Wrapper
          ref={ref}
          onClick={() => {
            const pos = ref.current?.getBoundingClientRect()
            console.log(pos?.right)
            console.log(pos?.top)
          }}
        >
          <Img $backgroundColor={color}>
            <DiscordIcon size={19} />
          </Img>
          {user.username}
        </Wrapper>
      </PopoutContainer>
    </>
  )
}

export default UserListItem
