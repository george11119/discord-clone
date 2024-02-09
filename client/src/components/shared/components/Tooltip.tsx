import { Tooltip as ReactTooltip } from "react-tooltip"
import { useId, useState } from "react"

const Tooltip = ({
  children,
  tooltip,
  placement,
}: {
  children: JSX.Element | string
  tooltip: string
  placement: "top" | "left" | "right" | "bottom"
}) => {
  const tooltipId = useId()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <a
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltip}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </a>
      <ReactTooltip
        className="tooltip"
        id={tooltipId}
        isOpen={isOpen}
        style={{
          backgroundColor: "#070707",
          fontSize: "16px",
          borderRadius: "4px",
        }}
        place={placement}
      />
    </>
  )
}

export default Tooltip
