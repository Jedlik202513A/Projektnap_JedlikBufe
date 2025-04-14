import { Authenticator } from "../controller/auth.controller";
import { Router } from "express";

export class AuthRoutes {
    public router = Router();
    
    constructor() {
        this.router.post('/api/auth/login', Authenticator.login)        
    }
}