import express from "express"
import connectDb from "./config/db.js"
import todoRoute from "./routes/todoRoutes.js"
import cors from 'cors'
import userRoute from "./routes/userRoute.js"
import {notFound, errorHandler} from './middleware/errorMiddelware.js'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'

dotenv.config();

const app = express()

connectDb()

let port = 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())
app.use(cors())

app.use('/api/todos', todoRoute)
app.use('/api/user', userRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server started on port : ${port}`)
})