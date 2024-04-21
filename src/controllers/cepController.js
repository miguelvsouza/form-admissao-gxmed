import { handle } from "../handlers/errorHandler.js"
import { consultarCepService } from "../services/cepService.js"

export async function consultarCep(req, res) {
    const { cep } = req.params

    try {
        const cepData = await consultarCepService(cep)
        res.status(200).send(cepData)
    } catch (error) {
        handle(error, res)
    }
}