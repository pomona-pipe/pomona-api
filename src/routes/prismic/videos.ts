/* eslint-disable camelcase */
import { Router } from 'express'
import { redisClient, checkRedisCache, redisCacheTime } from '../../middleware'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'
import { FileType } from '../../../types'

const redisKey = 'prismicVideos'

// create route and export to api
const router = Router()
router.use('/prismic/videos', checkRedisCache(redisKey), async (req, res) => {
  const fileTypes: FileType[] = ['Video']
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const prismicVideos = await createPrismicResults(
    fileTypes,
    serverUrl,
    page
  )
  // store data to redis
  redisClient.setex(redisKey, redisCacheTime, JSON.stringify(prismicVideos))
  // send response
  res.send(prismicVideos)
})
export default router
