import { Router } from 'express'
import { teacherController } from './techer.controller'
import auth from '../../middlewares/auth'

const techerRouter = Router()

techerRouter.get('/',auth("ADMIN"),teacherController.getAllTecher)
techerRouter.post('/create-techer', auth("ADMIN"), teacherController.createTeacher)
techerRouter.delete('/techer-delete/:id',auth("ADMIN"), teacherController.deleteTeacher)
techerRouter.patch('/update-techer/:id',auth("ADMIN"), teacherController.updateTeacher)
techerRouter.get('/assient-student/:id', teacherController.getMyStudents)

export default techerRouter
