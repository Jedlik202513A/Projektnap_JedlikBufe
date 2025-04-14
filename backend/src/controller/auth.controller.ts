import jwt, { Secret } from "jsonwebtoken"
import bcrypt from "bcrypt"
const UserModel = require("../models/user.model")

const acceptedUsers: typeof UserModel[] = [
    new UserModel({
        _id: 'testAdminId',
        name: 'kiss.marcell',
        orders: [],
        passwordHash: 'jelszo',
        role: 'admin'
    }),
    new UserModel({
        _id: 'testUserId',
        name: 'valaki.valaki',
        orders: [],
        passwordHash: 'jelszo',
        role: 'user'
    })
]

export class Authenticator {
    static async checkPassword(password: string, hash: string) {
        return password === hash;
        // return await bcrypt.compare(password, hash)
    }

    static async login(req: any, res: any) {
        const { username, password } = req.body
        if (!username || !password) return res.status(400).json({ error: "Bad request body, missing either username or password" })
        // const user = await UserModel.findOne({ username: username })
        const user = acceptedUsers.find(u => u.username == username);
        if (!user) return res.status(403).json({ message: "Invalid username or password" })
        if (await Authenticator.checkPassword(password, user.password_hashed)) {
            const token = jwt.sign({ username: username, role: user.role, id: user._id }, process.env.JWT_SECRET as Secret)            
            await user.save()
            return res.status(200).json({ token: token })
        }
        else {
            return res.status(403).json({ message: "Invalid username or password" })
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
        if (req.user.role === "admin") return true
        if (userid) {
            if (req.user.id != userid) return false
        }
        return req.user.role == 'user'
    }
}