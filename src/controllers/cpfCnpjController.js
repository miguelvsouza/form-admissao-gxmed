import { handle } from '../handlers/errorHandler.js'
import { consultarCpfService, consultarCnpjService } from '../services/cpfCnpjService.js'

export async function consultarCpfCnpj(req, res) {
    const { cpfCnpj } = req.params

    try {
        if (cpfCnpj.length == 11) {
            const dataCpfCnpj = await consultarCpfService(cpfCnpj)
            res.status(200).send(dataCpfCnpj)
        } else if (cpfCnpj.length == 14) {
            const dataCpfCnpj = await consultarCnpjService(cpfCnpj)
            res.status(200).send(dataCpfCnpj)
        } else {
            throw new Error('CPF ou CNPJ inválido')
        }
    } catch (error) {
        handle(error, res)
    }
}