import passport from "passport"
import express, { Request, Response } from "express"
import config from "../../config/config"
import jwt from "jsonwebtoken"
import tokenExtractor from "../../middleware/tokenExtractor"
import { User } from "../../models/user"

const router = express.Router()

router.get(
  "/logged_in",
  tokenExtractor,
  async (req: Request, res: Response) => {
    try {
      const token = req.token

      if (!token) return res.json({ loggedIn: false })

      const userId = jwt.verify(token, config.JWT_SECRET as string)
      const user = await User.findOneBy({ id: userId as string })

      if (!user) return res.json({ loggedIn: false })

      res.json({ loggedIn: true, user })
    } catch (e) {
      res.json({ loggedIn: false })
    }
  },
)

// username and password login
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req: Request, res: Response) => {
    // @ts-expect-error user is wrong type in Request type
    const token = jwt.sign(req.user.id, config.JWT_SECRET)
    res.json({ token })
  },
)

// google oauth login
router.get("/google", passport.authenticate("google", { scope: ["email"] }))

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.CLIENT_URL}`,
  }),
  (req, res) => {
    // @ts-expect-error user is wrong type in Request type
    const token = jwt.sign(req.user.id, config.JWT_SECRET)
    res.redirect(`${config.CLIENT_URL}/jwt?token=${token}`)
  },
)

// discord OAuth login
router.get("/discord", passport.authenticate("discord"))

router.get(
  "/discord/callback",
  passport.authenticate("discord", {
    session: false,
    failureRedirect: `${config.CLIENT_URL}`,
  }),
  (req, res) => {
    // @ts-expect-error user is wrong type in Request type
    const token = jwt.sign(req.user.id, config.JWT_SECRET)
    res.redirect(`${config.CLIENT_URL}/jwt?token=${token}`)
  },
)

export default router
