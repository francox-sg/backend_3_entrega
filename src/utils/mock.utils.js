import { faker } from "@faker-js/faker";
import { createHash } from "./hash.js";
import { v4 as uuidv4 } from 'uuid';

faker.locale = "es";

export const generateUserTest = async () => {
    
    const random = Math.random()*10
    const role = random <= 5 ? 'user' :'admin' 
    
    return {
        first_name: faker.person.firstName(),
        last_name:  faker.person.lastName(),
        age:    Math.round(random*10),
        email: faker.internet.email(),
        password: await createHash('coder123'),
        role: role, 
        //pets: [],
        //cart:[],
        //_id: uuidv4(), 
    };
};

export const generateUser = async () => {
    
    const random = Math.random()*10
    const role = random <= 5 ? 'user' :'admin' 
    
    return {
        first_Name: faker.person.firstName(),
        last_Name:  faker.person.lastName(),
        age:    Math.round(random*10),
        email: faker.internet.email(),
        password: await createHash('coder123'),
        role: role, 
        pets: [],
        //cart:[],
        //_id: uuidv4(), 
    };
};


export const createUsersMock = async (cant = 20) => {
    try {
        const usersArray = [];
        for (let i = 0; i < cant; i++) {
            const user = await generateUser();
            usersArray.push(user);
        }
        return usersArray;
    } catch (error) {
        throw new Error(error);
    }
}


export const createPetsMock = (cant=0)=>{
    let petsArray=[]

    for (let i = 0; i < cant; i++) {
        const pet = {
            name: faker.person.firstName(),
            type: faker.animal.type(),
            owner: null,
            adopted:false,
            //_id: uuidv4()
        }

        petsArray.push(pet);
    }
    return petsArray;

}
//console.log(faker.person.fullName());
//createUsersMock(3)

//console.log(createPetsMock());
