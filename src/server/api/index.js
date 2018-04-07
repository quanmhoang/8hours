import {Router} from 'express'
import links from './links'

const router = Router()

//	Authentication Routes
require('./authRoutes')(router)

router.get('/links', (req, res) => res.send(links))

export default router
