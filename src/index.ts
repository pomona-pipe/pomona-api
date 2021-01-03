import express from 'express'
import dotenv from 'dotenv'
import index from './routes'
import updateS3FromDropbox from './routes/s3/syncFromDropbox'
import saveFilesByType from './routes/redis/saveFilesByType'
import getFilesByType from './routes/prismic/getFilesByType'
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
  saveFilesByType,
  getFilesByType,
  sendToAlgolia,
  slackChannelPost,
  sendEmail,
  index
)

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
