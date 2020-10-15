import express from 'express'
import images from './routes/prismic/images'
import pdfs from './routes/prismic/pdfs'
import docs from './routes/prismic/docs'
import videos from './routes/prismic/videos'

// create express server
const app = express()
const port = Number(process.env.PORT || 8080);

// add routes
app.use(images, pdfs, docs, videos)

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
