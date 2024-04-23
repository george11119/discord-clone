import {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import useOnScreen from "../../hooks/useOnScreen.ts"
// WARNING: IF YOU EVER USE THIS POPOUT CONTAINER FOR ANYTHING EXCEPT THE USER INFO POPOUTS,
// MAKE SURE TO FIX THE BUG WHERE THE OFFSET HEIGHT AND WIDTH DONT UPDATE, CAUSING THE POPOUT
// TO BE POSITIONED WRONG

// just assume the math works, dont try to understand it
const calculatePopoutWidthPos = (
  ref: MutableRefObject<HTMLDivElement | null>,
  _popoutRef: HTMLDivElement | null,
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
    // console.log(popoutRef?.offsetWidth)
    const popoutWidth = 340
    return window.innerWidth - y - popoutWidth - padding
  }
}

// just assume the math works, dont try to understand it
const calculatePopoutHeightPos = (
  ref: MutableRefObject<HTMLDivElement | null>,
  _popoutRef: HTMLDivElement | null,
) => {
  const pos = ref.current?.getBoundingClientRect()
  const x = pos ? pos.top : 0
  // console.log(popoutRef?.offsetHeight)
  const popoutHeight = 414 // TODO make this not hardcoded

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
  position: fixed;
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
  style,
}: {
  popout: ReactNode
  children: ReactNode
  isOpen: boolean
  setIsOpen: (x: boolean) => void
  position: "left" | "right"
  style?: CSSProperties
}) => {
  const ref = useRef<HTMLDivElement | null>(null) // ref for the element the popout will be attached to
  const [popoutRef, setPopoutRef] = useState<HTMLDivElement | null>(null)

  const isVisible = useOnScreen(ref)

  // close the popout if the div that it is attached to goes out of view
  useEffect(() => {
    if (!isVisible) setIsOpen(false)
  }, [isVisible])

  // close the popout if clicked outside of it
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (
        !popoutRef?.contains(e.target as Node) &&
        !ref.current?.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [popoutRef])

  // so the position of the popout doesnt change when the "children" rerenders
  const memoizedPopout = useMemo(
    () => (
      <PopoutWrapper
        ref={setPopoutRef}
        $ref={ref}
        $popoutRef={popoutRef}
        $position={position}
      >
        {popout}
      </PopoutWrapper>
    ),
    [popoutRef],
  )

  useEffect(() => {
    if (!popoutRef) return
    const resizeObserver = new ResizeObserver(() => {
      // Do what you want to do when the size of the element changes
    })
    resizeObserver.observe(popoutRef)
    return () => resizeObserver.disconnect() // clean up
  }, [popoutRef])

  return (
    <>
      <div
        style={style ? style : {}}
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
      >
        {children}
      </div>
      {isOpen && memoizedPopout}
    </>
  )
}

export default PopoutContainer
