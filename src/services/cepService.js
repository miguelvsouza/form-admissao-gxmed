import fetch from "node-fetch"

export async function consultarCepService(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const data = await response.json()

    if (data.erro) {
        throw new Error('CEP não encontrado')
    }

    return data
}