import { Router } from "express";
import { userModel } from "../daos/mongodb/models/user.model.js";
import { createHash } from "../utils/hash.js";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";
import { authorizationRole } from "../middlewares/auth.middleware.js";
import { resUserDto } from "../dtos/user.dto.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authDto } from "../dtos/auth.dto.js";
import { userDto } from "../dtos/user.dto.js";
import { mailService } from "../services/mail.service.js";

const router= Router();

/* ----------------------------- AUTH ENDPOINTS ----------------------------- */

//Login
router.post("/login", validate(authDto), passport.authenticate("login", {session:false, failureRedirect: "/api/auth/login"}), authorizationRole(['admin','user']), async (req,res)=>{
    
    if(!req.user){
        return res.status(401).json({ error: "Usuario No Autorizado"})
    }

    //Informacion del Token
    const payload ={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
    }

    const token = generateToken(payload)

    res.cookie("token", token, {maxAge:100000, httpOnly:true})

    res.status(200).json({token, message:"Login Exitoso!"})
})


//Registro
router.post("/register", validate(userDto), async (req, res)=>{
    const {email, first_name, last_name, age, password, role} = req.body;

    if(!email || !first_name || !last_name || !age || !password ){
        return res.status(400).json({error: "Falta informacion"})
    }
    
    try {
        const newUser = {
            email,
            first_name,
            last_name,
            age,
            password: await createHash(password),
            role
        }
        console.log(newUser);
        const response = await userModel.create(newUser)

        //Envio de mail de Bienvenida
        await mailService.sendMail({to: email, subject: "Bienvenido", type: "welcome", name: first_name})

        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json({error: "Error al crear el Usuario", details: error})
    }
})

//Current User
router.get('/current', passport.authenticate("jwt",{session: false}), authorizationRole(['admin','user']), async (req, res)=>{
    console.log(req.user);
    
    res.status(200).json({
        message:"Bienvenido",
        user: await resUserDto(req.user)
    })
})

//Logout
router.get('/logout',  (req, res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"Sesion Cerrada",
    })
})



/* ----------------------------- Error Endpoints ---------------------------- */

router.get("/login", (req, res)=>{
    res.status(401).json({ error: "No Autorizado"})
})



export default router