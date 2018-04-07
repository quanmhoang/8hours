import mongoose from 'mongoose'
import passport from 'passport'
import PassportGoogle from 'passport-google-oauth20'
import keys from '../config/keys'

const GoogleStrategy = PassportGoogle.Strategy

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((userId, done) => {
	User.findById(userId).then(user => {
		done(null, user)
	})
})

passport.use(new GoogleStrategy({
	clientID: keys.GOOGLE_CLIENT_ID,
	clientSecret: keys.GOOGLE_CLIENT_SECRET,
	callbackURL: '/api/auth/google/callback',
	proxy: true
},
async (accessToken, refreshToken, profile, done) => {
	const existingUser = await User.findOne({ googleId: profile.id })
	if (existingUser) {
		done(null, existingUser)
	} else {
		const user = await new User({
			googleId: profile.id,
			displayName: profile.displayName,
			familyName: profile.name.familyName,
			givenName: profile.name.givenName,
			email: profile.emails.pop().value,
			gender: profile.gender
		}).save()
		done(null, user)
	}
}
))
