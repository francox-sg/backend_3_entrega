import {describe, test, before} from 'node:test'
import assert from 'node:assert'
import { generateUserTest } from '../../utils/mock.utils.js'


//Ejecucion de este test:  
// 1- node serverExpress.js
// 2- node src/test/integracion/user.test.js

const usersURL = 'http://localhost:8080/api/users'
const authURL = 'http://localhost:8080/api/auth'

let newUser={}
let newUserId=0
let cookieToken = null

/* -------------------------------------------------------------------------- */
/*                         Tests de Endpoints de User                         */
/* -------------------------------------------------------------------------- */

describe ("Tests API Users", ()=>{

    /* --------------------- Inicializacion de Nuevo Usuario -------------------- */
    before(async()=>{
        newUser = await generateUserTest();
        //console.log("newUser", newUser);
        
    })


    /* ----------------------- Obtener Todos los Usuarios ----------------------- */
    test("[GET] /api/users", async ()=>{
        const response = await fetch(usersURL);
        const responseJSON = await response.json()
        //console.log("responseJSON", responseJSON);
        
        assert.strictEqual(Array.isArray(responseJSON), true)
    })

    /* --------------------------- Registro de Usuario -------------------------- */
    test("[POST] /api/auth/register", async ()=>{
        const response = await fetch(`${authURL}/register`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        const responseJSON = await response.json()
        //console.log("responseJSON REGISTER", responseJSON);
        
        assert.ok(responseJSON._id)
        assert.equal(responseJSON.email, newUser.email)

        newUserId= responseJSON._id
    })

    /* ----------------------- Busqueda de Usuario por Id ----------------------- */
    test("[GET] /api/users/:uid", async ()=>{
        const response = await fetch(`${usersURL}/${newUserId}`);
        const responseJSON = await response.json()
        //console.log("responseJSON getByID", responseJSON);
        
        
        assert.equal(responseJSON._id, newUserId)

        
    })

    /* ---------------------------------- Login --------------------------------- */
    test("[POST] /api/auth/login", async ()=>{

        const credenciales ={
            email: newUser.email,
            password: 'coder123'
        }

        const response = await fetch(`${authURL}/login`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credenciales),
            credentials: 'include'
        });
        const responseJSON = await response.json()
        
        
        assert.ok(responseJSON.token)
        assert.equal(responseJSON.message, 'Login Exitoso!')
        //assert.equal(responseJSON.email, newUser.email)

        const setCookieHeader = response.headers.get('set-cookie')
        assert.ok(setCookieHeader)
        assert.ok(setCookieHeader.includes('token'))

        cookieToken = setCookieHeader.split(';')[0]

        
    })

    /* --------------------------------- Current -------------------------------- */
    test("[GET] /api/auth/current", async ()=>{
        //console.log({cookieToken});
        
        const response = await fetch(`${authURL}/current`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieToken
            },
            credentials: 'include'
        });
        const responseJSON = await response.json()
        //console.log("responseJSON getByID", responseJSON);

        
        
        assert.equal(responseJSON.user.email, newUser.email)
        assert.equal(responseJSON.message, 'Bienvenido')

        
    })


    /* --------------------------------- Logout --------------------------------- */
    test("[GET] /api/auth/logout", async ()=>{
        
        
        const response = await fetch(`${authURL}/logout`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieToken
            },
            credentials: 'include'
        });
        const responseJSON = await response.json()
        //console.log("responseJSON getByID", responseJSON);
        
        
        
        assert.equal(responseJSON.message, "Sesion Cerrada")

        
    })

}) 

