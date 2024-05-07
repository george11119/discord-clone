import { Tooltip as ReactTooltip } from "react-tooltip"
import { ReactNode, useId, useState } from "react"
import * as React from "react"

const Tooltip = ({
  children,
  tooltip,
  placement,
  fontSize,
  style,
}: {
  children: ReactNode | string
  tooltip: string
  placement: "top" | "left" | "right" | "bottom"
  fontSize?: number
  style?: React.CSSProperties
}) => {
  const tooltipId = useId()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltip}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(false)}
        onContextMenu={() => setIsOpen(false)}
      >
        {children}
      </div>
      <ReactTooltip
        className="tooltip"
        id={tooltipId}
        isOpen={isOpen}
        style={{
          backgroundColor: "#070707",
          fontSize: fontSize ? `${fontSize}px` : "16px",
          borderRadius: "4px",
          zIndex: 10,
          userSelect: "none",
          ...style,
        }}
        place={placement}
      />
    </>
  )
}

export default Tooltip
