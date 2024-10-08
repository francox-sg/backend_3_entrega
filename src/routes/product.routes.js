import { Router } from 'express'; //Punto de entrada de Router de Express
import {ProductMgr} from '../daos/fs/productManager.js'
import { validarNewProduct} from '../middlewares/middlewares.js';
import { validarPut } from '../middlewares/middlewares.js';
import { socketServer } from '../../serverExpress.js';
import * as controller from '../controllers/products.controller.js'

import passport from 'passport';
import { authorizationRole } from '../middlewares/auth.middleware.js';

const router = Router();

/* ---------------------------- PRODUCT ENDPOINTS --------------------------- */

//Devolver todos los Productos
router.get('/', controller.getProducts)

// Devolver Producto por ID
router.get('/:pid', controller.getProductById)

//Agregar Producto
router.post('/',passport.authenticate("jwt",{session: false}), authorizationRole(['admin']), validarNewProduct, controller.addProduct)

//Actualizar Producto
router.put('/:pid',passport.authenticate("jwt",{session: false}), authorizationRole(['admin']), validarPut, controller.updateProduct)

//Borrar Producto
router.delete('/:pid',passport.authenticate("jwt",{session: false}), authorizationRole(['admin']), controller.deleteProduct)

export default router




