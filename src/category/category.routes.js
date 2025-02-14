import { Router } from "express";
import { deleteCategory, listCategory, newCategory, updateCategory } from "./category.controller.js";
import { deleteCategoryValidator, newCategoryValidator, updateCategoryValidator } from "../middlewares/category.validator.js";

const router = Router();

router.post("/newCategory", newCategory, newCategoryValidator);

router.delete("/deleteCategory/:id", deleteCategory, deleteCategoryValidator);

router.get("/listCategory", listCategory);

router.patch("/updateCategory/:id", updateCategory, updateCategoryValidator);

export default router;