import { Router } from "express";
import { createSubject, getAllSubject } from "./subject.controller";


const subjectRoute = Router();

subjectRoute.post("/create-subject", createSubject )
subjectRoute.get("/", getAllSubject )

export default subjectRoute;