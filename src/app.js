import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'

const PORT = process.env.PORT
const app = express()

app.use('/api', routes)
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})