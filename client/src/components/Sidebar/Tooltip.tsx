import styled from "styled-components"

const TooltipWrapper = styled.span<{ isHovered: boolean }>`
  pointer-events: none;
  transform: scale(${({ isHovered }) => (isHovered ? 1 : 0)});
  transition: ${({ isHovered }) => (isHovered ? "transform 0.15s" : "none")};
  left: 72px;
  position: absolute;
  display: flex;
  align-items: center;
`

const TooltipMessage = styled.span`
  width: auto;
  padding: 10px;
  margin: 8px;
  border-radius: 8px;
  color: white;
  background: #070707;
`

const TooltipArrow = styled.span`
  position: absolute;
  margin-left: 3px;
  border-style: solid;
  border-width: 4px 5px 4px 0;
  border-color: transparent #070707 transparent transparent;
`

const Tooltip = ({
  tooltip,
  isHovered,
}: {
  tooltip: string
  isHovered: boolean
}) => {
  return (
    <TooltipWrapper isHovered={isHovered}>
      <TooltipArrow></TooltipArrow>
      <TooltipMessage>{tooltip}</TooltipMessage>
    </TooltipWrapper>
  )
}

export default Tooltip
