import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/user"
import bcrypt from "bcrypt"

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user!)
})

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOneBy({ email })
      const passwordHash = await User.findOne({
        where: { email: email },
        select: ["passwordHash"],
      })

      const passwordCorrect =
        passwordHash === null
          ? false
          : await bcrypt.compare(password, passwordHash.passwordHash)

      if (user && passwordCorrect) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (e) {
      return done(e)
    }
  }),
)
