import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            message: 'Authorization error'
        })
    }
    const token = (req.headers.authorization || '').split(' ')[1]

    if(token) {
        try {

            const decoded = jwt.verify(token, String(process.env.JWT_SECRET))
            if(decoded) {
                res.locals.jwt = decoded
                next()
            }

        } catch (e) {
            res.status(401).json({
                message: 'Authorization error'
            })
        }
    } else {
        res.status(401).json({
            message: 'Authorization error'
        })
    }

}