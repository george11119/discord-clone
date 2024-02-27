import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "../models/user"
import bcrypt from "bcrypt"
import config from "./config"

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const user = await User.findOneBy({ email })
      const passwordHash = await User.findOne({
        where: { email: email },
        select: ["passwordHash"],
      })

      const passwordCorrect = passwordHash
        ? await bcrypt.compare(password, passwordHash.passwordHash)
        : false

      if (!user || !passwordCorrect) {
        return done(null, false, { message: "Incorrect email or password" })
      }

      done(null, user, { message: "Login successful" })
    },
  ),
)

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3001/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOneBy({ email: profile._json.email })

      if (!user) {
        user = User.create({
          email: profile._json.email,
          username: `user_${profile._json.email}`,
        })

        await User.save(user)
      }

      done(null, user, { message: "Login successful" })
    },
  ),
)
