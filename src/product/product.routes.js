import { Router } from "express";
import { listOneProductValidator, listProductValidator, newProductValidator } from "../middlewares/product-validator.js";
import { listOneProduct, listProduct, newProduct } from "./product.controller.js";
const router = Router();

router.post("/newProduct", newProductValidator, newProduct);

router.get("/listProduct", listProductValidator, listProduct);

router.get("/listOneProduct/:id", listOneProductValidator, listOneProduct);
export default router;

