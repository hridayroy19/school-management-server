import { Router } from 'express'
import { resultController } from './result.controller'
import auth from '../../middlewares/auth'

const resultRouter = Router()

resultRouter.post('/create-result',auth("ADMIN","TEACHER"),resultController.createResult)
resultRouter.get('/', resultController.getResult)
resultRouter.get('/:id', resultController.getResultById)

export default resultRouter
