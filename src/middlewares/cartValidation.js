import { getUserByEmail } from "../services/carts.service.js"

export const cartValidation = async (req, res, next)=>{
    
    const {cid} = req.params
    
    try {

        const dbuser = await getUserByEmail(req.user.email)

        //Verificar si el Usuario ya posee un cart
        if(dbuser[0].cart){

            //Si el carrito del usuario coincide con el "cid"
            if(cid == dbuser[0].cart){
                next()
            }else{

                return res.status(404).json({message:`El cart ${cid} NO es el del usuario. El cart del Usuario es: ${dbuser[0].cart} `})
            }
        }else{
            return res.status(404).json({message:`El Usuario NO posee cart, créelo `})
        }
        
        
    } catch (error) {
        console.log(error);
        return res.status(400).send("El numero de CART enviado por params NO es el asociado al usuario, vea datos en /current ")
        
    }
}