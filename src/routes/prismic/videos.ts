import { Router } from 'express'
import { fetchPrismicResults } from '../../functions/prismic'

const router = Router()
router.use('/prismic/videos', async (req, res) => {
  const page = Number(req.query.page)
  try {
    const results = await fetchPrismicResults('videos', page)
    res.send(results)
  } catch(err) {
    res.status(500).send(err)
  }
})
export default router
