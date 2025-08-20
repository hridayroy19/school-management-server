import { Router } from 'express'
import { studnetController } from './student.controller'
import auth from '../../middlewares/auth'

const studentRouter = Router()

studentRouter.post('/create-student',auth("ADMIN"),studnetController.creatStudent)
studentRouter.get('/',auth("ADMIN") ,studnetController.getAllStudent)
studentRouter.get('/:id', studnetController.getSudent)
studentRouter.delete('/delete-student/:id',auth("ADMIN"),studnetController.deleteStudent)
studentRouter.patch('/update-student/:id',auth("ADMIN"), studnetController.updateStudent)
studentRouter.get('/classId/:id', studnetController.getClassIdStudents)

export default studentRouter
