export const stringToNum = (str: string): number => {
  const letter = str ? str.slice(-1) : "a"
  return letter.charCodeAt(0)
}
