import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/user"
import bcrypt from "bcrypt"

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const user = await User.findOneBy({ email })
      const passwordHash = await User.findOne({
        where: { email: email },
        select: ["passwordHash"],
      })

      const passwordCorrect =
        passwordHash === null
          ? false
          : await bcrypt.compare(password, passwordHash.passwordHash)

      if (!user || !passwordCorrect) {
        return done(null, false, { message: "Incorrect email or password" })
      }

      done(null, user, { message: "Login successful" })
    },
  ),
)
