import jwt from "jsonwebtoken";
import { getUserByMail } from "../services/user.service.js";

export async function login(req, res) {
    const user = getUserByMail(req.body.mail)
    if(!user){
        return res.status(404).json({
            message: 'No existe un usuario con ese mail'
        })
    }
    const token = jwt.sign({
        name: user.name,
        id: user.idUser
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        data: {token}
    })
}

export async function verifyToken(req, res, next){
    const token = req.header('token')
    if (!token) return res.status(401).json({ 
        error: 'Acceso denegado' 
    })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({
            error: 'El token no es válido'
        })
    }
}