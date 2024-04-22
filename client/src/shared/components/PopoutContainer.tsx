import { ReactNode, useState } from "react"
import { Placement } from "@popperjs/core"
import { usePopper } from "react-popper"

const PopoutContainer = ({
  popout,
  children,
  placement,
  isOpen,
  setIsOpen,
  modifiers,
}: {
  popout: ReactNode
  children: ReactNode
  placement: Placement
  isOpen: boolean
  setIsOpen: (x: boolean) => void
  modifiers: any
}) => {
  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null)
  const [popperEl, setPopperEl] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(referenceEl, popperEl, {
    placement,
    modifiers: [...modifiers],
  })

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} ref={setReferenceEl}>
        {children}
      </div>
      {isOpen && (
        <div style={styles.popper} {...attributes.popper} ref={setPopperEl}>
          {popout}
        </div>
      )}
    </>
  )
}

export default PopoutContainer
