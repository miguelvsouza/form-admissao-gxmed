import fetch from "node-fetch"

export async function consultarCpfService(cpf) {
    const url = `https://api.cpfcnpj.com.br/${process.env.TOKEN_API_CPF_CNPJ}/2/${cpf}`
    const response = await fetch(url)
    const data = await response.json()

    if (data.status != 1) {
        throw new Error('Documento não encontrado')
    }

    return data
}

export async function consultarCnpjService(cnpj) {
    const url = `https://api.cpfcnpj.com.br/${process.env.TOKEN_API_CPF_CNPJ}/6/${cnpj}`
    const response = await fetch(url)
    const data = await response.json()

    if (data.status != 1) {
        throw new Error('Documento não encontrado')
    }

    return data
}