import { UserDaoMongoDB } from "../daos/mongodb/user.dao.js";
import { PetDaoMongoDB } from "../daos/mongodb/pet.dao.js";

class MockServiceClass{

    async generateData(users, pets){
        const usersDB =await UserDaoMongoDB.createUsers(users)
        const petsDB = await PetDaoMongoDB.createPets(pets)
        return {
            usersDB,
            petsDB
        }
    }
    async getUsers(){
        return await UserDaoMongoDB.getUsers()

    }
    async getPets(){
        return await PetDaoMongoDB.getPets()

    }
}

export const MockService = new MockServiceClass