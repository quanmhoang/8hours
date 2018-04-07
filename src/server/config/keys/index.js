if (process.env.NODE_ENV === 'production') {
	module.exports = require('./production.key')
} else {
	module.exports = require('./development.key')
}
