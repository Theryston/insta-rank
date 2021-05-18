import express from 'express';
import { routes } from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(routes)

app.listen(3000, () => {
    console.log('server running in port 3000')
})