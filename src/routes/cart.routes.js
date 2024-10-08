import { Router } from "express";
/* import { CartMgr } from "../daos/fs/cartManager.js";
import { ProductMgr } from "../daos/fs/productManager.js"; */
import * as controller from '../controllers/carts.controller.js'
import passport from "passport";
import { authorizationRole } from "../middlewares/auth.middleware.js";
import { cartValidation } from "../middlewares/cartValidation.js";


const router = Router();

/* ----------------------------- CART ENDPOINTS ----------------------------- */

//Agregar Cart
router.post('/',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), controller.addCart)

//Devolver Cart por ID
router.get('/:cid',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidation, controller.getCartProductsById)

//Agregar Producto por ID a Cart por ID
router.post('/:cid/products/:pid', passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidation, controller.addProductToCart)

//Borrar Productos de Cart especifico
router.delete('/:cid/products/:pid',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidation, controller.removeProductOfCartById)

//Actualizar Cart por ID --> por body se pasa un array de products
router.put('/:cid',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidation, controller.updateCartById)

//Actualizar quantity de prod por Id y ID de cart
router.put('/:cid/products/:pid',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidation, controller.updateProductQuantityOfCartById)

//Borrar todos los Productos del Cart
router.delete('/:cid',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidation, controller.deleteAllProductsOfCart)

//Compra Final: Purchase
router.get('/:cid/purchase',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidation, controller.purchase)

export default router;