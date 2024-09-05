import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

class CartManager{
    
    constructor(path){
        this.path=path;
    }

    //Metodo Obtener Carts
    async getCarts(){
        if(fs.existsSync(this.path)){
            const carts = await fs.promises.readFile(this.path,'utf-8');
            return JSON.parse(carts)
        }
        return []
    }

    //Metodo Agregar Cart
    async addCart(){
        let id = uuidv4();
        const cart = {id:id, products:[]};
        let carts =[];

        
        //Si existe el archivo
        if(fs.existsSync(this.path)){                                               
            carts = await this.getCarts()

            //Verificacion de que no existe ese ID, se genera un nuevo ID en ese caso
            while(carts.some((cart)=>{return cart.id === id})){
                id= uuidv4();
                console.log("Generando nuevo ID");
            }
        }

        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return cart
        console.log("Se Agregó el Cart con ID: ",id); 
    }

    //Metodo Devuelve productos por ID de carrito
    async getCartProductsById(cartId){
        const carts = await this.getCarts()
        const index = carts.findIndex((cart) => {return cart.id===cartId} )
        
        if(index === -1){
            console.log("No existe el cart con ID: ",cartId);
            return -1
        }
        
        return carts[index].products

    }

    //Metodo Agregar Producto a Cart
    async addProductToCart(cartId, prodId){
        
            let carts = await this.getCarts()
            
            //Busqueda de Cart
            const cartIndex = carts.findIndex((cart) => {return cart.id===cartId} )
            if(cartIndex === -1){
                console.log("No existe el cart con ID: ",cartId);
                return -1
            }
    
            //Busqueda de Prod en Cart
            const productIndex = carts[cartIndex].products.findIndex((prod) => {return prod.id===prodId} )
    
            if(productIndex === -1){
                carts[cartIndex].products.push({id:prodId, quantity:1})
                console.log("No existia producto, se agregó prodID: ",prodId);
            }else{
                carts[cartIndex].products[productIndex].quantity += 1;
                console.log("El producto ya existia en carrito, se agrego 1 unidad");
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            
            return carts[cartIndex]
        

    }


}


export const CartMgr = new CartManager('./src/daos/fs/carrito.json')

const test = async ()=>{
    //await CartMgr.addCart();
    //const carts= await CartMgr.getCarts();
    //console.log(carts);
    //console.log(await CartMgr.getCartProductsById("3157f9cf-76ac-4565-84e4-9b6905923454"));
    //await CartMgr.addProductToCart("d1ebf7f5-8055-443f-9839-0aa21f224eb5",2,0)


}

test();



