import { createClient } from 'redis'
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'
import dotenv from 'dotenv'

// inject env variables
dotenv.config()

// frontend server
export const frontendServerUrl = process.env.FRONTEND_SERVER_URL!

// redis
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
const redisHost = process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'pomona-cluster-redis.s6dk68.0001.use1.cache.amazonaws.com'
export const redisClient = createClient(redisPort, redisHost)
export const redisCacheTime = 3600

// aws
export const cloudfrontUrl = 'https://d113q3lewv5kc2.cloudfront.net'

// dropbox
export const dropboxRoot = '/2020 Website'
export const dropbox = (() => {
  const {
    DROPBOX_APP_KEY,
    DROPBOX_APP_SECRET,
    DROPBOX_ACCESS_TOKEN
  } = process.env
  const options: DropboxTypes.DropboxOptions = {
    fetch,
    accessToken: DROPBOX_ACCESS_TOKEN!,
    clientId: DROPBOX_APP_KEY!
  }
  const dropbox = new Dropbox(options)
  dropbox.setClientSecret(DROPBOX_APP_SECRET!)
  return dropbox
})()

// prismic
export const prismicMaxPerPage = 50
