import { Prefix } from 'aws-sdk/clients/s3'
import { redisClient, redisCacheTime } from "../data";

// use to set redis keys for each file type being sent to Prismic
export async function setCacheValue(key: Prefix, value: any) {
  return new Promise((res, rej) => {
      redisClient.setex(key, redisCacheTime, JSON.stringify(value), (err, reply) => {
          if (err) rej(err)
          res(reply)
      });
    })
}

export async function getCacheValue(key: Prefix): Promise<any> {
  return new Promise((res, rej) => {
    redisClient.get(key, (err, data) => {
        if (err) rej(err)
        if (!data) {
          rej("Redis key not found");
          return
        }
        res(JSON.parse(data))
      });
  }) 
}
