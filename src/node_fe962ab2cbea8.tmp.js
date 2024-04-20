const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.static('../public'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}.`)
})