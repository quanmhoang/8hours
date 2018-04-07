/**
 * @flow
 * @file
 */
import 'babel-polyfill'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import cookieSession from 'cookie-session'
import fetch from 'isomorphic-fetch'
import addMiddlewares from './middlewares'
import API from './api'
import SSR from './ssr'
import keys from './config/keys'

//	Imports models
import './models/User'

//	Import services
import './services/passport'

//	Fetch global
global.fetch = fetch

//	Open DB Connection
mongoose.connect(keys.MONGO_URI).catch(error => {
	console.log(error)
})

// Initialize Express app
const app: express$Application = express()

// Add global middlewares
addMiddlewares(app)

// Add session cookie
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.COOKIE_KEY]
	})
)

app.use(passport.initialize())
app.use(passport.session())

// Add API
app.use('/api', API)

// Add SSR
app.use(SSR)

export default app
