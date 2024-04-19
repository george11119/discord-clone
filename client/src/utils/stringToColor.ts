// for profile picture colors
export const stringToColor = (str: string) => {
  const colors = [
    "#43b581", // green
    "#f8a619", // orange
    "#f44648", // red
    "#5562ea", // blue
    "#eb459e", // fushcia
    "#757e8b", // grey
  ]

  const letter = str ? str.slice(-1) : "a"
  const number = letter.charCodeAt(0)
  return colors[number % 6]
}
