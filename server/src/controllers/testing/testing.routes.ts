import express from "express"
import { clearDatabase } from "../../config/db"

const router = express.Router()

router.post("/reset", async (req, res) => {
  await clearDatabase()
  res.status(204).end()
})

export default router
