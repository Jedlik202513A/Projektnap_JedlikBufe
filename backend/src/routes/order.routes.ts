import { OrderController } from "../controller/order.controller";
import { Router } from "express";

export class OrderRoutes {
    public router = Router();
    
    constructor() {
        this.router.get('/api/orders', OrderController.getAll)        
        this.router.get('/api/orders/:id', OrderController.getOrderById)        
        this.router.post('/api/orders', OrderController.newOrder)        
    }
}