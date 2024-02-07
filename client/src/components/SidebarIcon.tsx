import styled from "styled-components"
import { motion } from "framer-motion"
import { useState } from "react"
import Tooltip from "./Tooltip.tsx"

const SidebarIconWrapper = styled.div`
  height: 48px;
  width: 48px;
  background: rgb(49, 51, 56);
  color: rgb(219, 222, 225);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
`

const SidebarIcon = ({ name, tooltip }: { name: string; tooltip?: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  const firstLetter: string = name[0].toUpperCase()

  return (
    <div>
      <SidebarIconWrapper
        as={motion.div}
        whileHover={{
          backgroundColor: "rgb(88, 101, 242)",
          borderRadius: "18px",
          transition: { duration: 0.15 },
        }}
        whileTap={{
          translateY: 1.5,
          transition: { duration: 0 },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsHovered(false)}
      >
        {firstLetter}
        <Tooltip tooltip={tooltip ? tooltip : name} isHovered={isHovered} />
      </SidebarIconWrapper>
    </div>
  )
}

export default SidebarIcon
