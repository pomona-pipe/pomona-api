import express from 'express'
import dotenv from 'dotenv'
import index from './routes'
import updateS3FromDropbox from './routes/s3/syncFromDropbox'
import saveImages from './routes/redis/images'
import savePdfs from './routes/redis/pdfs'
import saveVideos from './routes/redis/videos'
import getImages from './routes/prismic/images'
import getPdfs from './routes/prismic/pdfs'
import getVideos from './routes/prismic/videos'
import sendToAlgolia from './routes/algolia/sendPrismicPages'
import slackChannelPost from './routes/forms/sendToSlack'
import sendEmail from './routes/forms/sendEmail'

// inject env variables
dotenv.config()

// create express server
const app = express()
const port = Number(process.env.PORT || 8080);

// enable body parsing
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

// add routes
app.use(
  updateS3FromDropbox,
  saveImages,
  savePdfs,
  saveVideos,
  getImages,
  getPdfs,
  getVideos,
  sendToAlgolia,
  slackChannelPost,
  sendEmail,
  index
)

// start server
app.listen( port, () => {
    console.log( `Server started on port ${ port }` );
} );
