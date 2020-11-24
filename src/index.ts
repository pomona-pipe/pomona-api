import express from 'express'
import updateS3FromDropbox from './routes/s3UpdateFromDropbox'
import images from './routes/prismic/images'
import pdfs from './routes/prismic/pdfs'
import docs from './routes/prismic/docs'
import videos from './routes/prismic/videos'
import sendToAlgolia from './routes/prismic/send-to-algolia'
import slackChannelPost from './routes/forms/slackChannelPost'
import sendEmail from './routes/forms/sendEmail'

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
