import { createUsersMock, createPetsMock } from "../utils/mock.utils.js";
import { MockService } from "../services/mock.service.js";

class MocksClass{

    async mockingusers (req, res){
        const usersMock = await createUsersMock(50)
        //console.log({usersMock});
        
        return res.status(200).json(usersMock)
    }

    async generateData (req, res){
        const {numUsers, petUsers} = req.params

        const newUsers = await createUsersMock(numUsers)
        const newPets =  createPetsMock(petUsers)
        try {
            res.status(200).json({message: "Datos Generados!", data: await MockService.generateData(newUsers, newPets)})
            
        } catch (error) {
            console.log("Error en MockController -> generateData, error: ",error);
            res.status(400).send("Error en generacion de Datos")
        }
    }

    async getUsers (req, res){
        try {
            res.status(200).json({message: "Consulta Exitosa!", data: await MockService.getUsers()})
        } catch (error) {
            console.log("Error en MockController -> getUsers, error: ",error);
            res.status(400).send("Error intentando Obtener Usuarios")
        }
        res.status(200).json()
    }

    async getPets (req, res){
        try {
            res.status(200).json({message: "Consulta Exitosa!", data: await MockService.getPets()})
        } catch (error) {
            console.log("Error en MockController -> getPets, error: ",error);
            res.status(400).send("Error intentando Obtener Pets")
        }
    }
}

export const mocksController = new MocksClass;