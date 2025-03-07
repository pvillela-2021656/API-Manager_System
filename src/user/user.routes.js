import { Router } from "express";
import { deleteUserValidator, updateClientValidator, updateRoleValidator } from "../middlewares/user-validators.js";
import { deleteUserClientRole, updateOnlyClient, updateRole } from "./user.controller.js";

const router = Router();

/**
 * @swagger
 * /deleteUserByClientRole/{uid}:
 *   delete:
 *     summary: Delete a user by client role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user
 */
router.delete("/deleteUserByClientRole/:uid", deleteUserValidator, deleteUserClientRole);

/**
 * @swagger
 * /updateRole/{uid}:
 *   patch:
 *     summary: Update a user's role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
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
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user role
 */
router.patch("/updateRole/:uid", updateRoleValidator, updateRole);

/**
 * @swagger
 * /updateOnlyClientRole/{uid}:
 *   patch:
 *     summary: Update a user's role to client only
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
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
 *               role:
 *                 type: string
 *                 example: "client"
 *     responses:
 *       200:
 *         description: User role updated to client successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user role to client
 */
router.patch("/updateOnlyClientRole/:uid", updateClientValidator, updateOnlyClient);

export default router;