import mongoose from 'mongoose'
import IUser from './types.js'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model<IUser>('User', UserSchema)