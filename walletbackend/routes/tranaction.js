import express from 'express'
const router=express.Router()
import { checkBalance } from '../controller/getbalance.js'
import { sendCrypto } from '../controller/sendCrypto.js'
// Handling request using router
router.get("/checkbalance/:id",checkBalance)
router.post("/send",sendCrypto)
// Importing the router
export default router