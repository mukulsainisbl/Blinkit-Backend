import {Router} from "express"
import auth from "../middleware/authMiddleware.js"
import { cashOnDeliveryController } from "../controllers/order.controller.js"


const orderRouter = Router()

orderRouter.post('/cash-on-delivery' , auth , cashOnDeliveryController)

export default orderRouter