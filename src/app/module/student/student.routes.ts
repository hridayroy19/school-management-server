import { Router } from "express";
import { studnetController } from "./student.controller";


const studentRouter = Router()

studentRouter.post("/create-student", studnetController.creatStudent)
studentRouter.get("/", studnetController.getStudent)
studentRouter.delete("/delete-student/:id", studnetController.deleteStudent)
studentRouter.patch("/update-student", studnetController.creatStudent)

export default studentRouter;