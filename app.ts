import cors from "cors"
import express, { Request, Response } from "express"
import userRouter from "./src/modules/user/userRoute"

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.use('/api/v1/user', userRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('Server Running .....')
})

export default app 
