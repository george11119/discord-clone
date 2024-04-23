const UserJoinIcon = ({ size, color }: { size: number; color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      style={{ height: size, width: size }}
    >
      <g fill="none" fillRule="evenodd">
        <path d="m18 0h-18v18h18z" />
        <path
          d="m0 8h14.2l-3.6-3.6 1.4-1.4 6 6-6 6-1.4-1.4 3.6-3.6h-14.2"
          fill={color ? color : "#3ba55c"}
        />
      </g>
    </svg>
  )
}

export default UserJoinIcon
