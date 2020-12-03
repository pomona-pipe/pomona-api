/* eslint-disable camelcase */
import { Router } from 'express'
import { redisClient, checkRedisCache, redisCacheTime } from '../../middleware'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'
import { FileType } from '../../../types'

const redisKey = 'prismicPdfs'

// create route and export to api
const router = Router()
router.use('/prismic/pdfs', checkRedisCache(redisKey), async (req, res) => {
  const fileTypes: FileType[] = ['PDF']
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const prismicPdfs = await createPrismicResults(
    fileTypes,
    serverUrl,
    page
  )
  // store data to redis
  redisClient.setex(redisKey, redisCacheTime, JSON.stringify(prismicPdfs))
  // send response
  res.send(prismicPdfs)
})
export default router
