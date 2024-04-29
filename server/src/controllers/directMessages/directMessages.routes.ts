import express from "express"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"

const router = express.Router()
router.use(authenticatedValidator)

router.get("/:channelId", async (req, res) => {})

router.post("/", async (req, res) => {})

export default router
