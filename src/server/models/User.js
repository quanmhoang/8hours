import mongoose from 'mongoose'

const {Schema} = mongoose
const userSchema = new Schema({
	googleId: String,
	username: String,
	displayName: String,
	familyName: String,
	givenName: String,
	gender: String,
	email: String,
	password: String,
	birthday: String
})

mongoose.model('users', userSchema)
