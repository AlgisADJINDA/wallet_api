import express from 'express'
import dotenv from 'dotenv'
import { initDB } from './config/db.js'
import ratelimiter from './midleware/rateLimiter.js'
import transactionsRoute from './routes/transactionsRouter.js'

dotenv.config()

const app = express()

app.use(ratelimiter)
app.use(express.json())

const PORT = process.env.PORT

app.use('/api/transactions', transactionsRoute)

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on port:", PORT)
    })
})