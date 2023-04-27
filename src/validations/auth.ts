import { body } from 'express-validator'


export const registerValidation = [
    body('email', 'Email is required')
        .not().isEmpty()
        .bail()
        .isEmail().normalizeEmail().withMessage('Email is not valid'),
    body('password', 'Password must have min eight characters, at least one letter, one number and one special character')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "i")
]