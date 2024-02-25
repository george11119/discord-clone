import passport from "passport"
import express from "express"

const router = express.Router()

router.post("/", passport.authenticate("local"), (req, res) => {
  res.send({ success: true })
})

export default router
