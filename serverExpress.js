import express from 'express'
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io';
import productRouter from './src/routes/product.routes.js';
import cartRouter from './src/routes/cart.routes.js';
import viewsRouter from './src/routes/views-router.js'
import { ProductMgr } from './src/daos/fs/productManager.js';
import { initMongoDB } from './src/db/database.js';
//Backend2
import authRouter from './src/routes/auth.routes.js';
import userRouter from './src/routes/user.routes.js';
import mocksRouter from './src/routes/mocks.routes.js';
import { initializePassport } from './src/config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
//Backend 3
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { info } from './src/docs/info.js';

//Conexion con DB Mongo
initMongoDB()

const PORT= 8080;

const app = express();

const specs = swaggerJSDoc(info)

//Middlewares
app.use(express.json()) //Middleware para entender JSON que vine del Body de los req
app.use(express.urlencoded({extended:true})) //Reconoce Parametros de URL
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())
app.use('/docs',swaggerUI.serve, swaggerUI.setup(specs))


const httpServer = app.listen(PORT, ()=>{console.log(`Servidor iniciado en Puerto ${PORT}`);});

//Routes
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/',viewsRouter) //Vista de Handlebars
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/mocks', mocksRouter)

//Passport
initializePassport()
app.use(passport.initialize())

//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/src/views`)
app.set('view engine', 'handlebars')


//Sockets
export const socketServer = new Server(httpServer);

//Conexion de Cliente
socketServer.on('connection', async (socket)=>{
    
    console.log("Cliente conectado: ", socket.id);

    //Desconexin de Cliente
    socket.on('disconnect', ()=>{
        console.log("Cliente desconectado: ", socket.id);
    })

    //Primera conexion
    const products = await ProductMgr.getProducts();
    socket.emit('getProducts', products)

    //Nuevo Producto desde Form
    socket.on('newProductForm', async (formProduct)=>{
        console.log(formProduct);

        await ProductMgr.addProduct(formProduct)
        const products = await ProductMgr.getProducts();
        socketServer.emit('getProducts', products)
    })

    //Borrar Producto 
    socket.on('deleteProduct', async (idToDelete)=>{
        
        console.log("Entra a Delete");
        await ProductMgr.deleteProduct(idToDelete)
        const products = await ProductMgr.getProducts();
        socketServer.emit('getProducts', products)
    })
})


export default app







