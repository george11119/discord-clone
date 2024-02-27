import dotenv from "dotenv"

dotenv.config()

const config = {
  PORT: process.env.PORT || 3000,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}

// check that all env variables are defined
const configKeys = Object.keys(config)

configKeys.forEach((key) => {
  if (config[key as keyof typeof config] === undefined) {
    throw new Error(`env variable '${key}' is undefined`)
  }
})

export default config
