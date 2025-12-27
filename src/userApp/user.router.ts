import { Router } from "express"
import { getAllUsersController, loginUserController, registerUserController } from "./user.controller"


const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/login',loginUserController)

userRouter.get('/all',getAllUsersController)

export default userRouter