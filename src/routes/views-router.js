import { Router } from "express";
import { ProductMgr } from "../daos/fs/productManager.js";

const router = Router()

router.get('/', async(req, res)=>{

    const products = await ProductMgr.getProducts();
    
    res.render('home',{products})
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})

export default router