import { Router } from "express";
import { deleteCategoryValidator, listCategoryValidator, newCategoryValidator, updateCategoryValidator } from "../middlewares/category-validator.js";
import { deleteCategory, listCategory, newCategory, updateCategory } from "./category.controller.js";

const router = Router();

/**
 * @swagger
 * /newCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Category Name"
 *               categoryDescription:
 *                 type: string
 *                 example: "Category Description"
 *     responses:
 *       200:
 *         description: New category created successfully
 *       500:
 *         description: Error creating category
 */
router.post("/newCategory", newCategoryValidator, newCategory);

/**
 * @swagger
 * /deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

/**
 * @swagger
 * /listCategory:
 *   get:
 *     summary: List all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Error listing categories
 */
router.get("/listCategory", listCategoryValidator, listCategory);

/**
 * @swagger
 * /updateCategory/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Updated Category Name"
 *               categoryDescription:
 *                 type: string
 *                 example: "Updated Category Description"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error updating category
 */
router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory);

export default router;