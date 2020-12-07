import express from 'express'
import dotenv from 'dotenv'
import updateS3FromDropbox from './routes/s3/syncFromDropbox'
import images from './routes/s3/listImages'
import pdfs from './routes/s3/listPdfs'
import docs from './routes/s3/listDocs'
import videos from './routes/s3/listVideos'
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
  images,
  pdfs,
  docs,
  videos,
  sendToAlgolia,
  slackChannelPost,
  sendEmail
)

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
