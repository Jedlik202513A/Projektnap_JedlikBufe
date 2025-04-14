import { ItemController } from "../controller/item.controller";
import { Router } from "express";

export class ItemRoutes {
    public router = Router();
    
    constructor() {
        this.router.get('/api/items', ItemController.getItems)        
    }
}