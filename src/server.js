require('dotenv').config()
// require('node-fetch')
const packageJson = require('../package.json')
const express = require('express')
const app = express()

app.use(express.static('../public'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}.`)
})

app.get('/versao', (req, res) => {
    res.status(200).send(
        {
            "version": packageJson.version,
            "name": packageJson.name
        }
    )
})

app.get('/consultar-cep/:cep', async (req, res) => {
    const { cep } = req.params

    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`
        const response = await fetch(url)
        const data = await response.json()

        if (data.erro === true) {
            res.status(404).send({
                "erro": "CEP não encontrado"
            })
        } else {
            res.status(200).send({
                "cep": data.cep,
                "logradouro": data.logradouro,
                "bairro": data.bairro,
                "cidade": data.localidade,
                "uf": data.uf,
                "ibge": data.ibge
            })
        }
    } catch {
        res.status(400).send({
            "erro": "Houve um erro ao consultar o CEP"
        })
    }
})