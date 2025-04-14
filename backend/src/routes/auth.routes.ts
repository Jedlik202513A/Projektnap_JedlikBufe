import { Authenticator } from "controller/auth.controller";
import { Router } from "express";

export class AuthRoutes {
    public router = Router();
    
    constructor() {
        this.router.get('/api/auth/login', Authenticator.login)        
    }
}