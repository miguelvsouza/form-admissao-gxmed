import express from 'express'
import cepRoutes from './cepRoutes.js'
import cpfCnpjRoutes from './cpfCnpjRoutes.js'

const router = express.Router()

router.use('/cep', cepRoutes)
router.use('/cpfcnpj', cpfCnpjRoutes)

export default router