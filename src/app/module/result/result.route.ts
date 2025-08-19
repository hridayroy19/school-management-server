import { Router } from 'express'
import { resultController } from './result.controller'

const resultRouter = Router()

resultRouter.post('/create-result', resultController.createResult)
resultRouter.get('/', resultController.getResult)
resultRouter.get('/:id', resultController.getResultById)

export default resultRouter
