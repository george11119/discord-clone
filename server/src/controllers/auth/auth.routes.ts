import passport from "passport"
import express, { Request, Response } from "express"
import config from "../../config/config"
import tokenExtractor from "../../middleware/tokenExtractor"
import { User } from "../../models/user"
import jwtUtils from "../../utils/jwtUtils"

const router = express.Router()

router.get(
  "/logged_in",
  tokenExtractor,
  async (req: Request, res: Response) => {
    try {
      const token = req.token

      if (!token) return res.json({ loggedIn: false })

      const { userId } = jwtUtils.verifyToken(token)
      const user = await User.findOneBy({ id: userId })

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
    const token = jwtUtils.signToken({ userId: req.user?.id as string })
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
    const token = jwtUtils.signToken({ userId: req.user?.id as string })
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
    const token = jwtUtils.signToken({ userId: req.user?.id as string })
    res.redirect(`${config.CLIENT_URL}/jwt?token=${token}`)
  },
)

// github OAuth login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
)

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${config.CLIENT_URL}`,
  }),
  (req, res) => {
    const token = jwtUtils.signToken({ userId: req.user?.id as string })
    res.redirect(`${config.CLIENT_URL}/jwt?token=${token}`)
  },
)

export default router
