import { userService } from "../services/user.service.js";
import { createHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { resUserDto } from "../dtos/user.dto.js";
import { mailService } from "../services/mail.service.js";



class userContrl{
    
    async getUsers (req, res){
        try {
            const users = await userService.getUsers()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({error: "Error al obtener los Usuarios", details: error})
        }
    }


    async getUserById (req, res){
        const {id} = req.params;
        //console.log("userID",id);
        
        try {
            const user = await userService.getUserById(id)
    
    
            if(!user){
                return res.status(400).send("No existe el Usuario")
            }
    
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error: "Error al obtener el Usuario", details: error})
        }
    
    }

    async login (req, res){

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

    }
    
    async register (req, res){
        
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
            //console.log(newUser);
            const response = await userService.register(newUser)//userModel.create(newUser)
            
            //Envio de mail de Bienvenida
            await mailService.sendMail({to: email, subject: "Bienvenido", type: "welcome", name: first_name})
            
            res.status(200).json(response)
            
        } catch (error) {
            res.status(500).json({error: "Error al crear el Usuario", details: error})
        }
    }
    
    async current (req, res){

        //console.log(req.user);

        res.status(200).json({
            message:"Bienvenido",
            user: await resUserDto(req.user)
        })
    }
    
    async logout (req, res){

        res.clearCookie("token")
        res.status(200).json({
            message:"Sesion Cerrada",
        })
    }

}



export const userController = new userContrl