import { Router } from "express"
import { getAllUsersController, registerUserController } from "./user.controller"


const userRouter = Router()

userRouter.post('/register',registerUserController)

userRouter.get('/all',getAllUsersController)

export default userRouter