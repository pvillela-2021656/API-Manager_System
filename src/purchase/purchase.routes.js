import Router from 'express';
import { completeCartRequestValidator, newCartRequestValidator, purchaseHistoryValidator } from "../middlewares/purchase-validator.js";
import { completeCartRequest, newCartRequest, purchaseHistory } from "./purchase.controller.js";
const router = Router();

/**
 * @swagger
 * /newCartRequest/{user}:
 *   post:
 *     summary: Create a new cart request
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "product123"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       200:
 *         description: New cart request created successfully
 *       500:
 *         description: Error creating cart request
 */
router.post("/newCartRequest/:user", newCartRequestValidator, newCartRequest);

/**
 * @swagger
 * /bill/{user}:
 *   post:
 *     summary: Complete a cart request and generate a bill
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 example: "cart123"
 *     responses:
 *       200:
 *         description: Cart request completed and bill generated successfully
 *       500:
 *         description: Error completing cart request
 */
router.post("/bill/:user", completeCartRequestValidator, completeCartRequest);

/**
 * @swagger
 * /userPurchaseHistory/{user}:
 *   get:
 *     summary: Get purchase history for a user
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Purchase history retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving purchase history
 */
router.get("/userPurchaseHistory/:user", purchaseHistoryValidator, purchaseHistory);

export default router;