import express from 'express'
import { consultarCpfCnpj } from '../controllers/cpfCnpjController.js'

const router = express.Router()

router.get('/:cpfCnpj', consultarCpfCnpj)

export default router