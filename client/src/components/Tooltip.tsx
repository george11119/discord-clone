import { motion } from "framer-motion"
import styled from "styled-components"

const TooltipWrapper = styled.span`
  position: absolute;
  width: auto;
  padding: 10px;
  margin: 8px;
  left: 72px;
  border-radius: 8px;
  color: white;
  background: #070707;
  pointer-events: none;
`

// const TooltipArrow = styled.span`
//   position: absolute;
//   left: 75px;
//   border-style: solid;
//   border-width: 4px 5px 4px 0;
//   border-color: transparent #070707 transparent transparent;
// `

const Tooltip = ({
  tooltip,
  isHovered,
}: {
  tooltip: string
  isHovered: boolean
}) => {
  return (
    <>
      <TooltipWrapper as={motion.span} animate={{ scale: isHovered ? 1 : 0 }}>
        {tooltip}
      </TooltipWrapper>
    </>
  )
}

export default Tooltip
