import { Router } from "express";
import { deleteProductValidator, findOutOfStockValidator, listOneProductValidator, listProductValidator, mostSelledValidator, newProductValidator, updateProductValidator } from "../middlewares/product-validator.js";
import { deleteProduct, findOutOfStock, listOneProduct, listProduct, mostSelled, newProduct, updateProduct } from "./product.controller.js";
const router = Router();
//FUNCIONALIDAD 1
router.post("/newProduct", newProductValidator, newProduct);
//FUNCIONALIDAD 2
router.get("/listProduct", listProductValidator, listProduct);
//FUNCIONALIDAD 3
router.get("/listOneProduct/:id", listOneProductValidator, listOneProduct);
//FUNCIONALIDAD 4
router.put("/updateProduct/:id", updateProductValidator, updateProduct);
//FUNCIONALIDAD 5
router.get("/noStock", findOutOfStockValidator, findOutOfStock);

//FUNCIONALIDAD 6
/*
*SI SE DESEA USAR "MOST SELLED" SE DEBE CREAR 1 COMPRA POR LO MENOS DE ALGUN PRODUCTO,
*DE LO CONTRARIO SALDRA "No sales found greater than zero."
*/
router.get("/mostSelled", mostSelledValidator, mostSelled);
//FUNCIONALIDAD 7
router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);
export default router;

    