import { Router } from "express";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { loginAdminValidator, loginClientValidator, registerValidator } from "../middlewares/user-validators.js";
import { loginAdmin, loginClient, register } from "./auth.controller.js";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Error registering user
 */
router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    register
);

/**
 * @swagger
 * /loginAdmin:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       403:
 *         description: Only admins can log in here
 *       500:
 *         description: Error logging in
 */
router.post(
    "/loginAdmin",
    loginAdminValidator,
    loginAdmin
);

/**
 * @swagger
 * /loginClient:
 *   post:
 *     summary: Client login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "client123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Client logged in successfully
 *       403:
 *         description: Only clients can log in here
 *       500:
 *         description: Error logging in
 */
router.post(
    "/loginClient",
    loginClientValidator,
    loginClient
);

export default router;