import {Request, Response} from 'express'
import Products from "../models/Products.js";

const getProducts = async (req: Request, res: Response) => {
    return await Products.find({})
        .then((products) => res.status(200).json(products))
        .catch((error) => res.status(500).json({ error }))
}

export default { getProducts }