import { Router } from "express";
import { deleteCategory, listCategory, newCategory, updateCategory } from "./category.controller.js";
import { deleteCategoryValidator, newCategoryValidator, updateCategoryValidator, listCategoryValidator } from "../middlewares/category.validator.js";

const router = Router();

router.post("/newCategory", newCategoryValidator, newCategory);

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

router.get("/listCategory", listCategoryValidator, listCategory);

router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory);

export default router;