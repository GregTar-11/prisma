import express from 'express'
import userRouter from './userApp/user.router'


const app = express()

const PORT =8000

app.use(express.json())

app.use('/api/user', userRouter)

app.listen(PORT,()=>{
    console.log(`port http://localhost:${PORT}`)
})