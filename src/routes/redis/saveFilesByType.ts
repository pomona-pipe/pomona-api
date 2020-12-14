/* eslint-disable camelcase */
import { Router } from 'express'
import { S3UploadFolder } from '../../../types'
import { savePrismicResults } from '../../functions/prismic'

// TODO: convert to cron job using node-cron
// create route and export to api
const router = Router()
router.use('/redis/save-files-by-type', async (req, res) => {
  const type = req.query.type as S3UploadFolder
  if(!type) {
      res.status(400).send('Error: must specify a valid file type. Reference S3UploadFolder in types')
      return
  }
  try {
    const resultsSaved = await savePrismicResults(type)
    if(resultsSaved === 0) {
        res.status(404).send('Error: file type not found. Reference S3UploadFolder in types for a list of valid file types')
        return
    }
    res.send(`${resultsSaved} files saved to ${type} folder on S3`)
  } catch(err) {
    res.status(500).send(err)
  }
})
export default router
