import { Router } from 'express'
import indexHtml from '../views/index.html'

// create route and export to api
const router = Router()
router.use('/', async (req, res) => {
  res.send(indexHtml)
})
export default router
