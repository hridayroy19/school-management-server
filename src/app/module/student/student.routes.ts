import { Router } from "express";
import { studnetController } from "./student.controller";


const studentRouter = Router()

studentRouter.post("/create-student", studnetController.creatStudent)

export default studentRouter;