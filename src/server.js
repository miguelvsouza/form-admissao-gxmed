require('dotenv').config()
const packageJson = require('../package.json')
const express = require('express')
const app = express()

app.use(express.static('../public'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}.`)
})

app.get('/versao', (req, res) => {
    res.status(200).send({
        "versao": packageJson.version
    })
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

app.get('/consultar-cpf-cnpj/:cpfCnpj', async (req, res) => {
    const { cpfCnpj } = req.params
    const token = process.env.TOKEN_API_CPF_CNPJ

    try {
        if (cpfCnpj.length == 11) {
            // Aqui consulta se for CPF

            const url = `https://api.cpfcnpj.com.br/${token}/2/${cpfCnpj}`
            const response = await fetch(url)
            const data = await response.json()

            if (data.status == 1) {
                res.status(200).send({
                    "cpf": data.cpf,
                    "situacaoCadastral": data.situacao,
                    "nomeCompleto": data.nome,
                    "dataNascimento": data.nascimento,
                    "nomeMae": data.mae,
                    "genero": data.genero
                })
            } else {
                res.status(400).send({
                    "erro": "CPF inválido"
                })
            }

        } else if (cpfCnpj.length == 14) {
            // Aqui consulta se for CNPJ

            const url = `https://api.cpfcnpj.com.br/${token}/6/${cpfCnpj}`
            const response = await fetch(url)
            const data = await response.json()

            if (data.status == 1) {
                res.status(200).send({
                    "cnpj": "Ainda não implementado"
                })
            } else {
                res.status(400).send({
                    "erro": "CNPJ inválido"
                })
            }
        } else {
            res.status(404).send({
                "erro": "Informe um CPF ou CNPJ válido"
            })
        }
    } catch {
        res.status(500).send({
            "erro": "Houve um erro ao consultar"
        })
    }
})