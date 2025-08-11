import { Router } from "express"
import { classController } from "./class.controller";
import auth from "../../middlewares/auth";

const classRoute = Router()

classRoute.post('/create-class', auth("ADMIN"),classController.CreateClass)
classRoute.get('/',classController.getAllClass)


export default classRoute;
