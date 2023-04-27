import mongoose, { Schema, Types } from 'mongoose'

export interface ICategory {
    id: number
    name: string
    image: string
}

export interface IProducts {
    _id: number,
    title: string
    price: number
    description: string
    images: Array<string>
    category: ICategory
}

const ProductsSchema = new Schema(
    {
        _id: {
            type: Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        images: [String],
        category: {
            id: {type: Number, required: true},
            name: {type: String, required: true},
            image: {type: String, required: true}
        }
    },
)

export default mongoose.model<IProducts>('Products', ProductsSchema, 'products')