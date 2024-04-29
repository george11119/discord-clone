import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as DiscordStrategy } from "passport-discord"
import { Strategy as GithubStrategy } from "passport-github2"
import { User } from "../models/user"
import bcrypt from "bcrypt"
import config from "./config"

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const user = await User.findOne({
        where: [{ email: email }, { username: email }],
      })
      const passwordHash = await User.findOne({
        where: [{ email: email }, { username: email }],
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
      callbackURL: `${config.API_ENDPOINT}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile._json.email
      const username = email?.split("@")[0]

      let user = await User.findOneBy({ email })

      if (!user) {
        user = User.create({
          email,
          username,
        })

        await User.save(user)
      }

      done(null, user, { message: "Login successful" })
    },
  ),
)

passport.use(
  new DiscordStrategy(
    {
      clientID: config.DISCORD_CLIENT_ID as string,
      clientSecret: config.DISCORD_CLIENT_SECRET as string,
      callbackURL: `${config.API_ENDPOINT}/auth/discord/callback`,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, username } = profile

      let user = await User.findOneBy({ email })

      if (!user) {
        user = User.create({
          email,
          username,
        })

        await User.save(user)
      }

      done(null, user, { message: "Login successful" })
    },
  ),
)

passport.use(
  new GithubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID as string,
      clientSecret: config.GITHUB_CLIENT_SECRET as string,
      callbackURL: `${config.API_ENDPOINT}/auth/github/callback`,
      scope: ["user:email"],
    },
    // @ts-expect-error wtf it worked for the first 2
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value
      const { username } = profile

      let user = await User.findOneBy({ email })

      if (!user) {
        user = User.create({
          email,
          username,
        })

        await User.save(user)
      }

      done(null, user, { message: "Login successful" })
    },
  ),
)
