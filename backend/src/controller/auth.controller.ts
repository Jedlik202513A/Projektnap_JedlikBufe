import jwt, { Secret } from "jsonwebtoken"
import bcrypt from "bcrypt"
import UserModel from "models/UserModel";
import { log } from "console";

const acceptedUsers: any[] = [
    {
        _id: 'testAdminId',
        name: 'kiss.marcell',
        orders: [],
        passwordHash: 'jelszo',
        role: 1
    },
    {
        _id: 'testUserId',
        name: 'valaki.valaki',
        orders: [],
        passwordHash: 'jelszo',
        role: 0
    }
]

export class Authenticator {
    static checkPassword(password: string, hash: string) {
        return password === hash;
        // return await bcrypt.compare(password, hash)
    }

    static async login(req: any, res: any) {
        const { name, password } = req.body
        if (!name || !password) return res.status(400).json({ error: "Bad request body, missing either name or password" })
        // const user = await UserModel.findOne({ username: username })
        const user = acceptedUsers.find(u => u.name == name);        
        if (!user) return res.status(403).json({ message: "Invalid name or password" })
            log(user)
        if (Authenticator.checkPassword(password, user.passwordHash)) {
            const token = jwt.sign({ name: name, role: user.role, id: user._id }, 'very_secret_key')            
            // await user.save()
            return res.status(200).json({ token: token, username: name, role: user.role })
        }
        else {
            return res.status(403).json({ message: "Invalid asname or password" })
        }
    }

    static verifyToken(req: any) {
        if (!req.headers["authorization"]) return false
        const token = req.headers["authorization"].split(" ").pop()
        if (!token) return false
        let verifiedToken = false
        jwt.verify(token, process.env.JWT_SECRET as Secret, (err: any, decoded: any) => {
            if (err) {
                console.log(err);
                verifiedToken = false
            }
            if (decoded) {
                req.user = decoded
                verifiedToken = true
            }
        })
        return verifiedToken
    }

    static verifyUser(req: any, userid: string = "") {
        if (!Authenticator.verifyToken(req)) return false
        if (req.user.role === 1) return true
        if (userid) {
            if (req.user.id != userid) return false
        }
        return req.user.role === 0
    }
}