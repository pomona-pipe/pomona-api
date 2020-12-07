/* eslint-disable camelcase */
import { Router } from 'express'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'
import { FileType } from '../../../types'

// create route and export to api
const router = Router()
router.use('/s3/list-docs', async (req, res) => {
  const fileTypes: FileType[] = ['PDF', 'Word Document']
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const results = await createPrismicResults(
    fileTypes,
    serverUrl,
    page
  )
  res.send(results)
})
export default router
