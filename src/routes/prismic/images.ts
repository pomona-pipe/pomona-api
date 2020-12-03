/* eslint-disable camelcase */
import { Router } from 'express'
import { redisClient, checkRedisCache, redisCacheTime } from '../../middleware'
import { getServerUrl } from '../../tools'
import { createPrismicResults } from '../../functions/prismic'
import { FileType } from '../../../types'

const redisKey = 'prismicImages'

// create route and export to api
const router = Router()
router.use('/prismic/images', checkRedisCache(redisKey), async (req, res) => {
  const fileTypes: FileType[] = ['Image']
  const page = Number(req.query.page)
  const serverUrl = getServerUrl(req)
  const prismicImages = await createPrismicResults(
    fileTypes,
    serverUrl,
    page
  )
  // store data to redis
  redisClient.setex(redisKey, redisCacheTime, JSON.stringify(prismicImages))
  // send response
  res.send(prismicImages)
})
export default router
