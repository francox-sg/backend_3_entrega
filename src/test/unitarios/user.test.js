import assert from 'node:assert'
import {describe, before, test} from 'node:test'
import { UserDaoMongoDB } from '../../daos/mongodb/user.dao.js'
import { initMongoDB } from '../../db/database.js'
import { generateUser } from '../../utils/mock.utils.js'
import { CartDaoMongoDB } from '../../daos/mongodb/cart.dao.js'
//Ejecucion de este test:  
// node src/test/unitarios/user.test.js

describe('Test Unitarios User Dao', ()=>{

    let newUser={}
    let newUserId=0

    before( async ()=>{
        await initMongoDB()
        newUser = await generateUser() 
    })

    test('Deberia agregar un Usuario', async ()=>{
        const user = await UserDaoMongoDB.addUser(newUser)

        assert.ok(user._id)
        assert.equal(user.age , newUser.age)
        assert.equal(user.email , newUser.email)
        assert.equal(user.password , newUser.password)
        assert.equal(user.role , newUser.role)
        assert.equal(user.email , newUser.email)
        assert.strictEqual(user.pets.length , 0)

        newUserId = user._id;
        
    })

    test('Deberia buscar un Usuario por ID', async ()=>{
        const user = await UserDaoMongoDB.getUserById(newUserId)
        
        assert.equal(user._id.toString(), newUserId)
        assert.equal(user.age , newUser.age)
        assert.equal(user.email , newUser.email)
        assert.equal(user.password , newUser.password)
        assert.equal(user.role , newUser.role)
        assert.strictEqual(user.pets.length , 0)
        
    })

    test('Deberia buscar un Usuario por Email', async ()=>{
        const user = await UserDaoMongoDB.getUserByEmail(newUser.email)
        
        assert.equal(user[0]._id.toString() , newUserId)
        assert.equal(user[0].age.toString() , newUser.age)
        assert.equal(user[0].email , newUser.email)
        assert.equal(user[0].password , newUser.password)
        assert.equal(user[0].role , newUser.role)
        assert.strictEqual(user[0].pets.length , 0)
        
    })

    test('Deberia Agregar un carrito al usuario', async ()=>{
        const  newCart = await CartDaoMongoDB.addCart()
        
        const user = await UserDaoMongoDB.addCartToUser(newUser.email,newCart)
        
        assert.equal(user._id.toString() , newUserId)
        assert.equal(user.age.toString() , newUser.age)
        assert.equal(user.email , newUser.email)
        assert.equal(user.password , newUser.password)
        assert.equal(user.role , newUser.role)
        assert.strictEqual(user.pets.length , 0)
        assert.ok(user.cart)

    })

    test('Deberia retornar todos los Usuarios', async ()=>{
        const users = await UserDaoMongoDB.getUsers()
        assert.equal(Array.isArray(users), true)
    })
})