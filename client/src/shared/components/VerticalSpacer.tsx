const VerticalSpacer = ({
  height,
  ref,
}: {
  height: number
  [rest: string]: any
}) => {
  return <div style={{ minHeight: height }} ref={ref}></div>
}

export default VerticalSpacer
