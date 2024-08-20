import express from 'express'
import transaction from './routes/tranaction.js'
const router=express.Router()





const app = express()
app.use(express.json());
app.use("/transaction",transaction)

let PORT=5000
app.listen(PORT, () => {
    console.log("PORT ", PORT)
})