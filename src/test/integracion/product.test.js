import {describe, test, before} from 'node:test'
import assert from 'node:assert'
import { generateUserTest } from '../../utils/mock.utils.js'


//Ejecucion de este test:  
// 1- node serverExpress.js
// 2- node src/test/integracion/product.test.js

const productsURL = 'http://localhost:8080/api/products'
const authURL = 'http://localhost:8080/api/auth'

let newUser={}
let newProduct={
    title:          "Mochila",
    description:    "Blanca",
    code:           "123456",
    price:          2900,
    stock:          4,
    category:       "Ropa",
    status:         true
}
let newProductId=0
let cookieToken = null

/* -------------------------------------------------------------------------- */
/*                         Tests de Endpoints de Product                      */
/* -------------------------------------------------------------------------- */

describe ("Tests API Product", ()=>{


    /* ----------------------- Obtener Todos los Productos ----------------------- */
    test("[GET] /api/products", async ()=>{
        const response = await fetch(productsURL);
        const responseJSON = await response.json()

        assert.strictEqual(Array.isArray(responseJSON.paylaod), true)
    })

    /* --------------------------- Agregar Producto -------------------------- */
    test("[POST] /api/products", async ()=>{

        //Debo Estar Logueado Como Admin

        //Registro:
        newUser =await generateUserTest()
        newUser.role = "admin"

        const responseNewUser = await fetch(`${authURL}/register`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        const responseNewUserJSON = await responseNewUser.json()

        
        
        assert.ok(responseNewUserJSON._id)

        //Logueo:
        const credenciales ={
            email: newUser.email,
            password: 'coder123'
        }


        const responseLogin = await fetch(`${authURL}/login`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credenciales),
            credentials: 'include'
        });

        const responseLoginJSON = await responseLogin.json()
        assert.ok(responseLoginJSON.token)

        const setCookieHeader = responseLogin.headers.get('set-cookie')
        cookieToken = setCookieHeader.split(';')[0]


        //Nuevo Producto


        const response = await fetch(productsURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieToken
            },
            body: JSON.stringify(newProduct)
        });


        const responseJSON = await response.json()

;
        
        assert.ok(responseJSON._id)
        
        newProductId= responseJSON._id
    })

    /* --------------------------- Obtener Producto por ID -------------------------- */
    test("[POST] /api/products/:pid", async ()=>{

        const response = await fetch(`${productsURL}/${newProductId}`);

        const responseJSON = await response.json()

        
        assert.equal(responseJSON._id, newProductId)
        
    })

    /* --------------------------- Actualizar Producto por ID -------------------------- */
    test("[PUT] /api/products/:pid", async ()=>{

        //Verifico Precio de  Producto a actualizar
        const response = await fetch(`${productsURL}/${newProductId}`);

        const responseJSON = await response.json()

        assert.equal(responseJSON.price, 2900)


        
        //UPDATE
        const responseUpdate = await fetch(`${productsURL}/${newProductId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieToken
            },
            body: JSON.stringify({price:5000})
        });

        const responseUpdateJSON = await responseUpdate.json()
        console.log("responseJSON REGISTER", responseUpdateJSON);
        assert.equal(responseUpdateJSON.price, 5000)
        
    })

}) 

