import { CartModel } from "./models/cart.model.js"
import { ProductModel } from "./models/product.model.js";

class CartManager{
    
    

    //Metodo Obtener Carts
    async getCarts(){
        return await CartModel.find({})
    }

    //Metodo Agregar Cart
    async addCart(){
        
        const resp = await CartModel.create({products:[]})
        //console.log(resp);
        return resp
    }

    //Metodo Devuelve cart por ID
    async getCartById(cartId){
        return await CartModel.findById(cartId)//.populate("products.product");

    }
    //Metodo Devuelve productos por ID de carrito
    async getCartProductsById(cartId){
        return await CartModel.findById(cartId).populate("products.product");

    }

    //Metodo Elimina Producto de Cart
    async removeProductOfCartById(cartId, prodId){
        
        return await CartModel.findByIdAndUpdate(
            { _id: cartId },
            { $pull: { products: { product: prodId } } },
            { new: true }
        )
    }

    //Metodo Devuelve cart buscando por su ID y existencia de ProdId n sus Productos
    async existProdInCart(cartId,prodId){
        console.log("cartId:",cartId , "prodId", prodId);
        try {
            return await CartModel.findOne({
                _id: cartId,
                products: { $elemMatch: { product: prodId } }
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    //Metodo Agregar Producto a Cart
    async addProductToCart(cartId, prodId, quantity){
        quantity = quantity ? quantity: 1
        //Existencia de Cart
        const cart = await this.getCartById(cartId)
        
        if(cart != null){
            
            //Existencia de Prod en Cart
            const existProd= await this.existProdInCart(cartId, prodId)
            
            if(existProd){
                let index = existProd.products.findIndex(prod =>{return prod.product.toString() ===prodId})
                console.log("index: ",index);
                return await CartModel.findOneAndUpdate(
                        { _id: cartId, 'products.product': prodId },
                        { $set: { 'products.$.quantity': existProd.products[index].quantity + quantity } },
                        { new: true }
                    );
            }else{
                
                return await CartModel.findByIdAndUpdate(
                    cartId,
                    { $push: { products: { product: prodId, quantity: quantity } } },
                    { new: true }
                )
            }

            
        }

        return null

    }

    //Metodo Actualizar Cart por ID
    async updateCartById(cartId, obj){
        console.log(obj);
        return await CartModel.findByIdAndUpdate(cartId,{$set: {products: obj}},  {new:true})
        
    }
    //Metodo Actualizar cantidad de producto en cart
    async updateProductQuantityOfCartById(cartId, prodId, quantity =1){
        //Existencia de Cart
        const cart = await this.getCartById(cartId)
        
        if(cart != null){
            
            //Existencia de Prod en Cart
            const existProd= await this.existProdInCart(cartId, prodId)
            
            if(existProd){
                let index = existProd.products.findIndex(prod =>{return prod.product.toString() ===prodId})
                console.log("index: ",index);
                return await CartModel.findOneAndUpdate(
                        { _id: cartId, 'products.product': prodId },
                        { $set: { 'products.$.quantity': quantity } },
                        { new: true }
                    );
            }

            
        }

        return null

    }
    

    //Metodo Borrar todos los productos de cart
    async deleteAllProductsOfCart(cartId){
        
        return await CartModel.findByIdAndUpdate(cartId,{$set: {products: []}},  {new:true})
        
    }
        
    
    
    
    
    
}



export const CartDaoMongoDB = new CartManager()


//Pruebas
import { initMongoDB } from "../../db/database.js";

//Conexion con DB Mongo

//initMongoDB()

const test = async()=>{
    try {
        //console.log(await CartDaoMongoDB.getCartProductsById("666ef19d35ea0eb1cf79ae3c")); 
        //console.log(await CartDaoMongoDB.addProductToCart("666ef19d35ea0eb1cf79ae3c","666e2dea634a4440c6bfabcf")); 
        //console.log(await CartDaoMongoDB.removeProductOfCartById("666ef19d35ea0eb1cf79ae3c","666e2dea634a4440c6bfabcf")); 
        
    } catch (error) {
        console.log(error);
    }
}

//test()



