const info = (...params: any): void => {
  if (process.env.JEST !== "true") {
    console.log(...params)
  }
}

const error = (...params: any): void => {
  if (process.env.JEST !== "true") {
    console.error(...params)
  }
}

export default {
  info,
  error,
}
