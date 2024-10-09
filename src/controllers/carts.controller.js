import * as services from '../services/carts.service.js'
import { addTicket } from '../services/ticket.service.js';
import { getProductById, updateProduct } from '../services/products.service.js';
import { resTicketDto } from '../dtos/ticket.dto.js';
import { v4 as uuidv4 } from 'uuid';


export const addCart = async(req, res)=>{

    const user= req.user
    
    
    const dbuser = await services.getUserByEmail(user.email)
    
    
    try{
        
        //Verificar si el Usuario ya posee un cart
        if(dbuser[0].cart){
            return res.status(404).json({message:`El Usuario ya posee el cart ${dbuser[0].cart} `})
        }

        const newCart = await services.addCart()

        const userUpdated = await services.addCartToUser(user.email, newCart._id)

        res.status(200).json({message: `Se creo un nuevo cart para el Usuario ${userUpdated.email}`, cart:newCart}) 
        
    }
    catch(error){
        console.log(error);
        res.status(404).json({msj:"error"})
    }
}

export const getCartProductsById =  async (req, res)=>{
    const {cid} = req.params;

    try{
        const cart = await services.getCartProductsById(cid)
        if(cart != null){
            res.status(200).json(cart)
        }else{
            res.status(404).send("No existe el cart")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }

}

export const addProductToCart =  async (req, res)=>{
    const {cid, pid} = req.params;
    const {quantity} = req.query;
    
    try{
        
            const cart = await services.addProductToCart(cid, pid, Number(quantity))
            if(cart != null){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    
    catch(error){
        res.status(404).json({msj:"error"})
    }

}


export const removeProductOfCartById =  async (req, res)=>{
    const {cid, pid} = req.params;
    
    try{
        
            const cart = await services.removeProductOfCartById(cid, pid)
            if(cart != null){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    
    catch(error){
        res.status(404).json({msj:"error"})
    }
    
    
    
}
export const updateCartById =  async (req, res)=>{
    const {cid} = req.params;
    const obj = req.body;
    //console.log("controller", obj);
    try{
        
        const cart = await services.updateCartById(cid, obj)
        if(cart != null){
            res.status(200).json(cart)
        }else{
            res.status(404).send("El cart no existe")
        }
    }
    
    catch(error){
        res.status(404).json({msj:"error"})
    }
}

export const updateProductQuantityOfCartById =  async (req, res)=>{
    const {cid, pid} = req.params;
    const {quantity} = req.body;
    try{
        
            const cart = await services.updateProductQuantityOfCartById(cid, pid, quantity)
            if(cart != null){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    
    catch(error){
        res.status(404).json({msj:"error"})
    }
}


export const deleteAllProductsOfCart =  async (req, res)=>{
    const {cid} = req.params;

    try{
        
            const cart = await services.deleteAllProductsOfCart(cid)
            if(cart != null){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    
    catch(error){
        res.status(404).json({msj:"error"})
    }    
}


export const purchase = async (req, res)=>{
    const {cid} = req.params;

    try {
        
        
        //Verificar Existencia de Carrito
        const cart = await services.getCartProductsById(cid)

        if(!cart){
            return res.status(400).send("Carrito no encontrado")
        }
        
        let ticketProducts = []
        let productsOutOfStock=[]
        let TotalPurchase = 0

        //ForEach de cart.products
        await Promise.allSettled(

        cart.products.map( async (product)=>{
            
            const dbProduct = await getProductById(product.product)

            //Existe el Producto
            if(dbProduct){
                
                if(product.quantity <= dbProduct.stock){
                    
                    //Decremento de Stock de Producto
                    await updateProduct(product.product, {stock: dbProduct.stock - product.quantity})
                    
                    //Agrego a array de productos en ticket
                    ticketProducts.push(product)
                    
                    //Sumo al total
                    TotalPurchase += product.quantity * dbProduct.price;
                    
                    //Borro Producto del Carrito
                    await services.removeProductOfCartById(cid, product.product._id)

                }else{
                    productsOutOfStock.push(product)
                }
            }
            else{
                productsOutOfStock.push(product)
                
            }
        })
        )

        //Busqueda de User por Email
        const userComplete = await services.getUserByEmail(req.user.email)

        if(userComplete ==null){
            return res.status(400).send("Usuario Inexistente")
        }
        
        //Generacion de Codigo Unico
        const code = uuidv4();

        //Generacion de Ticket a guardar en DB
        const ticket ={
            code: code,
            amount: TotalPurchase,
            purchaser: req.user.email,
            purchaserId: userComplete[0]._id
        }

        const ticketResponse = await addTicket(ticket)

        if(ticketResponse!=null){
            //console.log(ticketResponse);
            
            return res.status(200).json({ ticket: resTicketDto(ticketResponse[0]), ticketProducts: ticketProducts ,productOutOfStock:productsOutOfStock })
        }else{
            
            return res.status(400).send("No fue posible generar el ticket")
        }


    } catch (error) {
        console.log(error);
        
        res.status(404).json({msj:error})
    }
}

    