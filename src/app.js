import express from 'express'
import routes from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})