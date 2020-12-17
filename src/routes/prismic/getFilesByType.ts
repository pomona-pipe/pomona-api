/* eslint-disable camelcase */
import { Router } from 'express'
import { S3UploadFolder } from '../../types'
import { fetchPrismicResults } from '../../functions/prismic'

// TODO: allow multiple file types
// create route and export to api
const router = Router()
router.use('/prismic/get-files-by-type', async (req, res) => {
  const type = req.query.type as S3UploadFolder
  if(!type) {
      res.status(400).send('Error: must specify a valid file type. Reference S3UploadFolder in types')
      return
  }
  const page = Number(req.query.page)
  try {
    const results = await fetchPrismicResults(type, page)
    if(results.results_size === 0) {
        res.status(404).send('Error: file type not found. Reference S3UploadFolder in types for a list of valid file types')
        return
    }
    res.send(results)
  } catch(err) {
    res.status(500).send(err)
  }
})
export default router
