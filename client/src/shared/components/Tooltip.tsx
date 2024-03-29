import { Tooltip as ReactTooltip } from "react-tooltip"
import { useId, useState } from "react"

const Tooltip = ({
  children,
  tooltip,
  placement,
  fontSize,
}: {
  children: JSX.Element | string
  tooltip: string
  placement: "top" | "left" | "right" | "bottom"
  fontSize?: number
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
          zIndex: 2,
          userSelect: "none",
        }}
        place={placement}
      />
    </>
  )
}

export default Tooltip
