import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import ProductsRoute from './routes/Products.js'
import AuthRoute from './routes/Auth.js'
import config from "./config/config.js";

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', ProductsRoute)
app.use('/api/auth', AuthRoute)

mongoose.connect(config.mongo.url)
    .then(() => console.log('connected to database'))
    .catch((err) => console.log('database connection error', err))

app.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}...`)
})