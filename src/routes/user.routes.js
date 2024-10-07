import { Router } from "express";
//import { userModel } from "../daos/mongodb/models/user.model.js";
import { userController } from "../controllers/user.controller.js";

const router= Router();

/* ----------------------------- USER ENDPOINTS ----------------------------- */

//Obtener TODOS los usuarios
router.get('/',  userController.getUsers)

//Obtener Usuario por ID
router.get('/:id', userController.getUserById)








export default router
