import { UserDaoMongoDB } from "../daos/mongodb/user.dao.js";



class userSrv{
    
    async getUsers (){
        try {
            const users = await UserDaoMongoDB.getUsers()
            
            
            return users

        } catch (error) {
            console.log(error);
            
        }
    }


    async getUserById (id){

        console.log("userID",id);
        
        try {
            const user = await UserDaoMongoDB.getUserById(id)
            return user

        } catch (error) {
            console.log(error);
            
        }
    
    }

    async register (newUser){

        try {
            const user = await UserDaoMongoDB.addUser(newUser)
            return user

        } catch (error) {
            console.log(error);
            
        }
    
    }

}



export const userService = new userSrv