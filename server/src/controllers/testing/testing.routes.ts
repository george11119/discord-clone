import express from "express"
import { clearDatabase } from "../../config/db"

const router = express.Router()

router.post("/reset", async (req, res) => {
  await clearDatabase()
  res.status(200).json({ cleared: true })
})

export default router
