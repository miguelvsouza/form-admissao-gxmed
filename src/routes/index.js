import express from 'express'
import cepRoutes from './cepRoutes.js'

const router = express.Router()

router.use('/cep', cepRoutes)

export default router