import type { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/token"

interface IToken {
    id: number,
    iat: number,
    exp: number
}

export function authTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(400).json({ status: "error", message: 'authorization required' })
    }
    const [type, token] = authHeader.split('')

    if (type !== "Bearer" || !token) {
        return res.status(400).json({ status: "error", message: 'authorization is invalid' })
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as IToken
        res.locals.userId = decoded.id
        next()
    }
    catch (err) {
        return res.status(400).json({ status: "error", message: 'token is invalid' })
    }
}

