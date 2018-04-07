import passport from 'passport'

module.exports = router => {
	router.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	)

	router.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/')
		}
	)

	router.get('/logout', (req, res) => {
		req.logout()
		res.redirect('/')
	})

	router.get('/current_user', (req, res) => {
		res.send(req.user)
	})
}
