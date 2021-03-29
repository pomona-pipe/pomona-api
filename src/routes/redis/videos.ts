/* eslint-disable camelcase */
import { Router } from 'express'
import { savePrismicResults } from '../../functions/prismic'

// TODO: convert to cron job using node-cron
// create route and export to api
const router = Router()
router.use('/redis/videos', async (req, res) => {
  try {
    const resultsSaved = await savePrismicResults('videos')
    res.send(`${resultsSaved} files saved to /videos in pomona-dropbox S3 bucket`)
  } catch(err) {
    res.status(500).send(err)
  }
})
export default router
