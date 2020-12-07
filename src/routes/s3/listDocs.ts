/* eslint-disable camelcase */
import { Router } from 'express'
import { Prefix } from 'aws-sdk/clients/s3'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'

// create route and export to api
const router = Router()
router.use('/s3/list-docs', async (req, res) => {
  const filePrefix: Prefix = 'docs'
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const results = await createPrismicResults(
    filePrefix,
    serverUrl,
    page
  )
  res.send(results)
})
export default router
