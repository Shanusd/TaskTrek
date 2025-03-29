import express from 'express'
import { authUser, createUser, logout } from '../controllers/userController.js'

const userRoute = express.Router();

userRoute.post('/createUser', createUser);
userRoute.post('/authUser', authUser);
userRoute.get('/logout', logout)


export default userRoute;