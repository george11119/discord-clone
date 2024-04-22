import { MutableRefObject, ReactNode, useRef, useState } from "react"
import styled from "styled-components"

// just assume the math works, dont try to understand it
const calculatePopoutWidthPos = (
  ref: MutableRefObject<HTMLDivElement | null>,
  popoutRef: HTMLDivElement | null,
  position: "left" | "right",
) => {
  const pos = ref.current?.getBoundingClientRect()

  if (position === "left") {
    const y = pos ? pos.left : 0
    const padding = 8
    return window.innerWidth - y + padding
  }

  if (position === "right") {
    const y = pos ? pos.right : 0
    const padding = 8
    const popoutWidth = popoutRef ? popoutRef.offsetWidth : 0
    return window.innerWidth - y - popoutWidth - padding
  }
}

// just assume the math works, dont try to understand it
const calculatePopoutHeightPos = (
  ref: MutableRefObject<HTMLDivElement | null>,
  popoutRef: HTMLDivElement | null,
) => {
  const pos = ref.current?.getBoundingClientRect()
  const x = pos ? pos.top : 0
  const popoutHeight = popoutRef ? popoutRef.offsetHeight : 0

  // if popout will overflow when opened, position it so it doesnt
  if (x + popoutHeight > window.innerHeight) {
    return window.innerHeight - popoutHeight - 12
  }

  // position the popout so that the tops of both divs are the same height
  return x
}

const PopoutWrapper = styled.div<{
  $ref: MutableRefObject<HTMLDivElement | null>
  $popoutRef: HTMLDivElement | null
  $position: "left" | "right"
}>`
  position: absolute;
  right: ${(props) =>
    calculatePopoutWidthPos(props.$ref, props.$popoutRef, props.$position)}px;
  top: ${(props) => calculatePopoutHeightPos(props.$ref, props.$popoutRef)}px;
  z-index: 1;
`

// only allows left and right positioning
const PopoutContainer = ({
  popout,
  children,
  isOpen,
  setIsOpen,
  position,
}: {
  popout: ReactNode
  children: ReactNode
  isOpen: boolean
  setIsOpen: (x: boolean) => void
  position: "left" | "right"
}) => {
  const ref = useRef<HTMLDivElement | null>(null) // ref for the element the popout will be attached to
  const [popoutRef, setPopoutRef] = useState<HTMLDivElement | null>(null)

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} ref={ref}>
        {children}
      </div>
      {isOpen && (
        <PopoutWrapper
          ref={setPopoutRef}
          $ref={ref}
          $popoutRef={popoutRef}
          $position={position}
        >
          {popout}
        </PopoutWrapper>
      )}
    </>
  )
}

export default PopoutContainer
