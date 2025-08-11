import { Router } from "express";
import { teacherController } from "./techer.controller";

const techerRouter = Router();

techerRouter.post("/create-techer", teacherController.createTeacher)

export default techerRouter;