import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

class ProductManager{
    
    constructor(path){
        this.path=path;
    }

    //Metodo Obtener Productos
    async getProducts(limit = undefined){
        if(fs.existsSync(this.path)){
            let products = await fs.promises.readFile(this.path,'utf-8');
            products= JSON.parse(products)

            if(limit < products.length){
                products = products.slice(0, limit)
            }
            
            return products
        }
        return []
    }

    //Metodo Obtener Producto Por ID
    async getProductById(id){
        if(fs.existsSync(this.path)){
            const products = await this.getProducts()

            const index = products.findIndex((prod)=>{ return prod.id === id})
            console.log("index: ",index);
            if(index != -1){
                console.log("Producto obtenido");
                return products[index]
            }
        }
        console.log("Producto inexistente");
        return -1


    }

    //Metodo Agregar Producto
    async addProduct(prodToAdd){
        
        let id = uuidv4();
        let productos = []
        let newProd= {...prodToAdd, status:true};

        //Si existe el archivo
        if(fs.existsSync(this.path)){                                               
            productos = await this.getProducts()
            
            //Verificacion de que no existe ese ID, se genera un nuevo ID en ese caso
            while(productos.some((prod)=>{return prod.id === id})){
                id= uuidv4();
                console.log("Generando nuevo ID de Producto");
            }
        }

        newProd["id"]=id;
        console.log("Nuevo Producto es ",newProd);
        productos.push(newProd);
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
        console.log("Se Agrego el nuevo Producto");
        return newProd;
    
    }

    //Metodo Actualizar Producto
    async updateProduct(prodId, prodToUpdate){
        //Elimino ID si es que tiene
        let prodToUpdateNoID =prodToUpdate
        delete prodToUpdateNoID.id

        let products = await this.getProducts();
        let productReturn= {}

        if(products.some((prod)=>{return prod.id === prodId})){
            
            products = products.map((prod)=>{
                if(prod.id === prodId){
                    productReturn = {...prod, ...prodToUpdateNoID}
                    return (productReturn)
                }else{
                    return prod
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log("Se actualizó el producto correctamente");
            return productReturn
            }
        else{
            console.log(`El producto con ID ${prodId} no existe`);
            return -1
            }
    }


    //Metodo Borrar Producto
    async deleteProduct(prodId){

        let products = await this.getProducts();
        
        if(products.some((prod)=>{return prod.id === prodId})){
            
            const index = products.findIndex((prod) => prod.id === prodId );
            products.splice(index,1)
            
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log("Se eliminó el producto correctamente");
        }
        else{
            console.log(`El producto con ID ${prodId} no existe`);
            return -1
            }
    }

}


export const ProductMgr = new ProductManager('./src/daos/fs/productos.json')



const test = async ()=>{
    //const prods = await ProductMgr.getProducts(5);
    //console.log(prods);
    //await ProductMgr.addProduct({quantity:3, title:"zapatillas"})
    //await ProductMgr.updateProduct(2,{id:2, title:"Campera"})
    // await ProductMgr.deleteProduct(4)
    /* await ProductMgr.addProduct({   title: 'Camisa',
                                    description: 'Remera Negra Talle S',
                                    code: 'CODE1',
                                    price: 7000,
                                    status: true,
                                    stock: 10,
                                    category: 'Indumentaria',
                                    thumbnails: [
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxoD6NarTIVb4yiGF53l7XeyofS-aUimwBWA&s',
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSyhd5GXOhOhGJrKvnXv_RLEUCWuwk2jEo7w&s',
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTANly1i52CXwPW1ZP7nuXrrg99Jzf_RUJ8TQ&s'
                                    ]
                                }) */
 
    //console.log(await ProductMgr.getProductById(2));

}

//test();

