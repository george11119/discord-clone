import styled from "styled-components"

const Wrapper = styled.div`
  .spinner {
    transform-origin: center;
    animation: spin 2s linear infinite;
  }

  .spinner circle {
    stroke-linecap: round;
    animation: draw_spinner_lines 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes draw_spinner_lines {
    0% {
      stroke-dasharray: 0 150;
      stroke-dashoffset: 0;
    }
    47.5% {
      stroke-dasharray: 42 150;
      stroke-dashoffset: -16;
    }
    95%,
    100% {
      stroke-dasharray: 42 150;
      stroke-dashoffset: -59;
    }
  }
`

const LoadingSpinner = ({ size, color }: { size: number; color?: string }) => {
  return (
    <Wrapper style={{ height: size, width: size }}>
      <svg
        width={size}
        height={size}
        stroke={color ? color : "#5865f2"}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="spinner">
          <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
        </g>
      </svg>
    </Wrapper>
  )
}

export default LoadingSpinner
