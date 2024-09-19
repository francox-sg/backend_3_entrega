import { CartDaoMongoDB } from "../daos/mongodb/cart.dao.js";
import { ProductDaoMongoDB } from "../daos/mongodb/product.dao.js";
//import { TicketDaoMongoDB } from "../daos/mongodb/ticket.dao.js";
import { UserDaoMongoDB } from "../daos/mongodb/user.dao.js";

export const addCart = async()=>{
    
    
    try {
        const resp= await CartDaoMongoDB.addCart();
        
        return resp
    } catch (error) {
        console.log(error);
    }
}

export const getCartProductsById = async(id)=>{
    
    
    try {
        const resp= await CartDaoMongoDB.getCartProductsById(id);
        
        return resp
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async(cartId, prodId, quantity)=>{
    
    
    try {
        const prodExists = await ProductDaoMongoDB.getProductById(prodId)
        if(prodExists){
            const resp= await CartDaoMongoDB.addProductToCart(cartId, prodId, quantity);
            return resp
        }else{
            return null
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const removeProductOfCartById = async(cartId, prodId)=>{
    
    
    try {
        
        const resp= await CartDaoMongoDB.removeProductOfCartById(cartId, prodId);
        return resp
        
    } catch (error) {
        console.log(error);
    }
}

export const updateCartById = async(cartId, obj)=>{
    
    
    try {
        
        const resp= await CartDaoMongoDB.updateCartById(cartId, obj);
        return resp
        
    } catch (error) {
        console.log(error);
    }
}

export const updateProductQuantityOfCartById = async(cartId, prodId, quantity)=>{
    
    
    try {
        
        
            const resp= await CartDaoMongoDB.updateProductQuantityOfCartById(cartId, prodId, quantity);
            return resp
        
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteAllProductsOfCart = async(cartId)=>{
    
    
    try {
        
        
            const resp= await CartDaoMongoDB.deleteAllProductsOfCart(cartId);
            return resp
        
        
    } catch (error) {
        console.log(error);
    }
}

/* export const addTicket = async(ticket)=>{
    try {
        
            const resp= await TicketDaoMongoDB.addTicket(ticket);
            return resp
        
        
    } catch (error) {
        console.log(error);
    }
} */
export const getUserByEmail = async(email)=>{
    try {
        
            const resp= await UserDaoMongoDB.getUserByEmail(email);
            return resp
        
        
    } catch (error) {
        console.log(error);
    }

}
export const addCartToUser = async(userId, cartId)=>{
    try {
        
            const resp= await UserDaoMongoDB.addCartToUser(userId,cartId);
            return resp
        
        
    } catch (error) {
        console.log(error);
    }

}