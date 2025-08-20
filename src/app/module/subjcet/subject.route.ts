import { Router } from 'express'
import { createSubject, getAllSubject } from './subject.controller'
import auth from '../../middlewares/auth'

const subjectRoute = Router()

subjectRoute.post('/create-subject',auth("ADMIN"),createSubject)
subjectRoute.get('/',  getAllSubject)

export default subjectRoute
