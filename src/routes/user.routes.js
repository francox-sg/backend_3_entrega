import { Router } from "express";
import { userModel } from "../daos/mongodb/models/user.model.js";

const router= Router();

/* ----------------------------- USER ENDPOINTS ----------------------------- */

//Obtener TODOS los usuarios
router.get('/', async (req, res)=>{
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: "Error al obtener los Usuarios", details: error})
    }
})

//Obtener Usuario por ID
router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const user = await userModel.find(id)

        if(!user){
            return res.status(400).send("No existe el Usuario")
        }

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: "Error al obtener el Usuario", details: error})
    }
})








export default router
