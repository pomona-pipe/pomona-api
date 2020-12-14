/* eslint-disable camelcase */
import { Router } from 'express'
import s3UpdateFromDropbox from '../../functions/awsDropboxIntegration'

// TODO: convert to cron job using node-cron
// create route and export to api
const router = Router()
router.use('/s3/sync-from-dropbox', async (req, res) => {
  const results = await s3UpdateFromDropbox()
  res.send(results)
})
export default router
