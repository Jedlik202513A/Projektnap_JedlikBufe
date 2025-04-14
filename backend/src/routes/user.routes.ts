import { UserController } from "controller/user.controller";
import { Router } from "express";

export class UserRoutes {
    public router = Router();
    
    constructor() {
        this.router.post('/api/users/order', UserController.)        
    }
}