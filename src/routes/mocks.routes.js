import { Router } from "express";
import { mocksController } from "../controllers/mocks.controller.js";
///import { userModel } from "../daos/mongodb/models/user.model.js";

const router= Router();

/* ----------------------------- MOCK ENDPOINTS ----------------------------- */


router.get('/mockingusers', mocksController.mockingusers )

router.post('/generateData/:numUsers/:petUsers', mocksController.generateData)

router.get('/users', mocksController.getUsers)

router.get('/pets', mocksController.getPets)



export default router
