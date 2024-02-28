import dotenv from "dotenv"

dotenv.config()

const config = {
  PORT: process.env.PORT || 3000,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  SERVER_URL: process.env.SERVER_URL || "http://localhost:3001",
  API_ENDPOINT: process.env.SERVER_URL
    ? `${process.env.SERVER_URL}/api`
    : "http://localhost:3001/api",
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
}

// check that all env variables are defined
const configKeys = Object.keys(config)

// throw an error if a env variable is undefined
configKeys.forEach((key) => {
  if (config[key as keyof typeof config] === undefined) {
    throw new Error(`env variable '${key}' is undefined`)
  }
})

export default config
