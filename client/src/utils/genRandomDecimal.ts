// generates a random decimal value between the minVal and maxVal
// number of decimal places of returned value determined by decimalPlaces
export const genRandomDecimal = (
  minVal: number,
  maxVal: number,
  decimalPlaces: number = 2
) => {
  return (Math.random() * (maxVal - minVal) + minVal).toFixed(decimalPlaces)
}
