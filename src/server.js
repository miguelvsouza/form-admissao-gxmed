require('dotenv').config()
const packageJson = require('../package.json')
const express = require('express')
const app = express()

app.use(express.static('../public'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}.`)
})

app.get('/version', (req, res) => {
    res.status(200).send(
        {
            "version": packageJson.version,
            "name": packageJson.name
        }
    )
})