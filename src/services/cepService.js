import fetch from "node-fetch"

export async function consultarCepService(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const data = await response.json()

    if (data.erro) {
        throw new Error('CEP não encontrado')
    }

    return {
        "cep": data.cep,
        "logradouro": data.logradouro,
        "bairro": data.bairro,
        "cidade": data.localidade,
        "uf": data.uf,
        "ibge": data.ibge
    }
}