const VerticalSpacer = ({
  height,
  ref,
}: {
  height: number
  [rest: string]: any
}) => {
  return <div style={{ height }} ref={ref}></div>
}

export default VerticalSpacer
