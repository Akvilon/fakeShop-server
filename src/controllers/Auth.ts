import {Request, Response} from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {validationResult} from 'express-validator'
import IUser from '../models/types.js'

const createToken = (obj: IUser) => {
    const token = jwt.sign(
        {
            id: obj._id
        },
        process.env.JWT_SECRET!,
        {expiresIn: '30d'}
    )
    return token
}

const register = async (req: Request, res: Response) => {
    try {
        const validationsErrors = validationResult(req)
        if(!validationsErrors.isEmpty()) {
            res.status(400).json(validationsErrors.array().map(err => err.msg))
        } else {
            const { email, password } = req.body
            const user = await User.findOne({email})

            if(user) {
                res.status(401).json({
                    message: 'User already exists'
                })
                return
            }
            const salt = bcrypt.genSaltSync(10)
            const hashedPass = bcrypt.hashSync(password, salt)

            const newUser = new User({
                email,
                password: hashedPass
            })
            const token = createToken(newUser)

            await newUser.save()

            res.status(200).json({
                newUser, token, message: 'Your account has been successfully created'
            })
        }

    } catch (e) {
        res.status(401).json({
            message: 'Error during account creation'
        })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user) {
            res.status(401).json({
                message: 'Please register'
            })
        } else {
            const isPassCorrect = await bcrypt.compare(password, user.password)

            if(!isPassCorrect) {
                res.status(400).json({
                    message: 'Wrong password'
                })
            }

            const token = createToken(user)

            res.status(200).json({
                token, user, message: 'Welcome on FakeShop!'
            })
        }

    } catch (e) {
        res.status(401).json({
            message: 'Authorization error'
        })
    }
}

const getMe = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne(req.body._id)
        if(!user) {
            res.status(401).json({
                message: 'Please register'
            })
        } else {
            const token = res.locals.jwt
            res.status(200).json({
                token, user
            })
        }

    } catch (e) {
        res.status(401).json({
            message: 'Authorization error'
        })
    }
}

export default {register, login, getMe}