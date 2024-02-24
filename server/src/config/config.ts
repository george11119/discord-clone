import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"

export default { PORT, CLIENT_URL }
