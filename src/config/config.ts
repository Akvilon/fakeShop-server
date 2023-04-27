import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4000
const DB_USERNAME = process.env.DB_USERNAME || ''
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_NAME = process.env.DB_NAME || ''
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.oabfrlk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

export default {
    server: {
        port: PORT
    },
    mongo: {
        url: DB_URL
    }
}