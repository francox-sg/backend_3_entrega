import { userModel } from "./models/user.model.js"


class UserManager{
    
    

    //Metodo Obtener users
    async getUsers(){
        
        const users = await userModel.find({})
        
        return users
    }

    //Metodo Agregar user
    async addUser(user){
        
        return  await userModel.create(user)
    }

    //Metodo Agregar users
    async createUsers(users){
        
        return  await userModel.insertMany(users)
    }

    //Metodo Devuelve user por code
    async getUserByEmail(email){
        
        return await userModel.find({email})
    }

    //Metodo Actualizar Usuario
    async addCartToUser(userEmail, cartId){
        try {
            
            const user = await this.getUserByEmail(userEmail)
            //console.log("DAO ADdCartToUser, USERL",user[0]);
            //console.log("DAO ADdCartToUser, USER ID ",user[0]._id);
            
            const resp = await userModel.findByIdAndUpdate(user[0]._id, {cart:cartId}, {new: true});
            //console.log("DAO RESP", resp);
            return resp
            
        } catch (error) {
            console.log(error);
        }
    }

    //Metodo Get User By ID
    async getUserById(id){
        try {
            
            const user = await userModel.findById(id)
            
            return user
        } catch (error) {
            console.log(error);
            
        }
    }
}



export const UserDaoMongoDB = new UserManager()





