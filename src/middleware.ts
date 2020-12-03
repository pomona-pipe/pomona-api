import { createClient } from 'redis'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

// inject env variables
dotenv.config()

// redis client (6379 is the default redis port)
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
export const redisClient = createClient(redisPort)

// redis cache time in ms
export const redisCacheTime = 3600

// redis cache middleware
export function checkRedisCache(cacheKeyName: string) {
   return function(req: Request, res: Response, next: () => any) {
    redisClient.get(cacheKeyName, (err, data) => {
        if(err) throw err
        if(data) {
          res.send(JSON.parse(data))
        } else {
          next()
        }
      })
   }
}

