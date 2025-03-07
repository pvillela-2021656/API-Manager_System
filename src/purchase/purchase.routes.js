import Router from 'express';
import { completeCartRequestValidator, newCartRequestValidator, purchaseHistoryValidator } from "../middlewares/purchase-validator.js";
import { completeCartRequest, newCartRequest, purchaseHistory } from "./purchase.controller.js";
const router = Router();

router.post("/newCartRequest/:user", newCartRequestValidator, newCartRequest)

router.post("/bill/:user", completeCartRequestValidator, completeCartRequest)
//BUSCAR FACTURA POR USUARIO
router.get("/userPurchaseHistory/:user", purchaseHistoryValidator, purchaseHistory)
export default router;