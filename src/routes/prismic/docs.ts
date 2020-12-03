/* eslint-disable camelcase */
import { Router } from 'express'
import { redisClient, checkRedisCache, redisCacheTime } from '../../middleware'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'
import { FileType } from '../../../types'

const redisKey = 'prismicDocs'

// create route and export to api
const router = Router()
router.use('/prismic/docs', checkRedisCache(redisKey), async (req, res) => {
  const fileTypes: FileType[] = ['PDF', 'Word Document']
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const prismicDocs = await createPrismicResults(
    fileTypes,
    serverUrl,
    page
  )
  // store data to redis
  redisClient.setex(redisKey, redisCacheTime, JSON.stringify(prismicDocs))
  // send response
  res.send(prismicDocs)
})
export default router
