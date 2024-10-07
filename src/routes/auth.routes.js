import { Router } from "express";
//import { userModel } from "../daos/mongodb/models/user.model.js";
//import { createHash } from "../utils/hash.js";
import passport from "passport";
//import { generateToken } from "../utils/jwt.js";
import { authorizationRole } from "../middlewares/auth.middleware.js";
//import { resUserDto } from "../dtos/user.dto.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authDto } from "../dtos/auth.dto.js";
import { userDto } from "../dtos/user.dto.js";
//import { mailService } from "../services/mail.service.js";
import { userController } from "../controllers/user.controller.js";

const router= Router();

/* ----------------------------- AUTH ENDPOINTS ----------------------------- */

//Login
router.post("/login", validate(authDto), passport.authenticate("login", {session:false, failureRedirect: "/api/auth/login"}), authorizationRole(['admin','user']), userController.login )

//Registro
router.post("/register", validate(userDto), userController.register)

//Current User
router.get('/current', passport.authenticate("jwt",{session: false}), authorizationRole(['admin','user']), userController.current)

//Logout
router.get('/logout',  userController.logout)



/* ----------------------------- Error Endpoints ---------------------------- */

router.get("/login", (req, res)=>{
    res.status(401).json({ error: "No Autorizado"})
})



export default router