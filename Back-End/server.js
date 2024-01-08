import express from 'express'
import cors from 'cors'
import sequelize from './config/dbConnection.js'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import { login } from './controllers/userController.js'
import { logOut } from './middlewares/auth.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use('/products', productRoute)
app.use('/user', userRoute)
app.post('/login', login)
app.get('/logout', logOut)

try {
    await sequelize.authenticate()
    console.log('Connection established')
}
catch (error) {
    console.log('unable to connect')
}

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`)
})