import { Router } from 'express';
import auth from '../middleware/authToken.js';
import { 
    CashOnDeliveryOrderController, 
    getOrderDetailsController, 
} from '../controller/order.controller.js';

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
 
orderRouter.get("/order-list", auth, getOrderDetailsController);
 

export default orderRouter;
