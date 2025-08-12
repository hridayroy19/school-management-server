import { Router } from "express";
import { teacherController } from "./techer.controller";

const techerRouter = Router();

techerRouter.get("/", teacherController.getAllTecher)
techerRouter.post("/create-techer", teacherController.createTeacher)
techerRouter.delete("/create-delete/:id", teacherController.deleteTeacher)
techerRouter.patch("/update-techer/:id", teacherController.createTeacher)

export default techerRouter;