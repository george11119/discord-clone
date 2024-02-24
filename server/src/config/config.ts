import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"
const DATABASE_URL = process.env.DATABASE_URL

export default { PORT, CLIENT_URL, DATABASE_URL }
