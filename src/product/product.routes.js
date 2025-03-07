import { Router } from "express";
import { deleteProductValidator, findOutOfStockValidator, listOneProductValidator, listProductValidator, mostSelledValidator, newProductValidator, updateProductValidator } from "../middlewares/product-validator.js";
import { deleteProduct, findOutOfStock, listOneProduct, listProduct, mostSelled, newProduct, updateProduct } from "./product.controller.js";
const router = Router();

/**
 * @swagger
 * /newProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Product Name"
 *               productCategory:
 *                 type: string
 *                 example: "Category ID"
 *               productDescription:
 *                 type: string
 *                 example: "Product Description"
 *               productPrice:
 *                 type: number
 *                 example: 100
 *               productStock:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: New product added successfully
 *       500:
 *         description: There was a mistake in the making of this product
 */
router.post("/newProduct", newProductValidator, newProduct);

/**
 * @swagger
 * /listProduct:
 *   get:
 *     summary: List all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Here are all the products in the DB
 *       500:
 *         description: There was an error while trying to find all products
 */
router.get("/listProduct", listProductValidator, listProduct);

/**
 * @swagger
 * /listOneProduct/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *       500:
 *         description: Couldnt find the specific product
 */
router.get("/listOneProduct/:id", listOneProductValidator, listOneProduct);

/**
 * @swagger
 * /updateProduct/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Updated Product Name"
 *               productCategory:
 *                 type: string
 *                 example: "Updated Category ID"
 *               productDescription:
 *                 type: string
 *                 example: "Updated Product Description"
 *               productPrice:
 *                 type: number
 *                 example: 150
 *               productStock:
 *                 type: number
 *                 example: 30
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       500:
 *         description: Couldnt update the product
 */
router.put("/updateProduct/:id", updateProductValidator, updateProduct);

/**
 * @swagger
 * /noStock:
 *   get:
 *     summary: List all out of stock products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Out of stock products
 *       500:
 *         description: Couldnt find the out of stock products
 */
router.get("/noStock", findOutOfStockValidator, findOutOfStock);

/**
 * @swagger
 * /mostSelled:
 *   get:
 *     summary: List most sold products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Here are all the most selled products based on our DB
 *       404:
 *         description: No sales found greater than zero
 *       500:
 *         description: There was an error at trying to find the most selled products
 */
router.get("/mostSelled", mostSelledValidator, mostSelled);

/**
 * @swagger
 * /deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Couldnt find the product to delete
 *       500:
 *         description: Couldnt delete the product
 */
router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

export default router;
    