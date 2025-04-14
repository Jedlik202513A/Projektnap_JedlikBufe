import { CategoryController } from "../controller/category.controller";
import { Router } from "express";

export class CategoryRoutes {
    public router = Router();
    
    constructor() {
        this.router.get('/api/categories', CategoryController.getCategories)        
    }
}