import { body, param } from "express-validator";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";
import { categoryExists } from "../helpers/db-validators.js"

export const newCategoryValidator = [
    body("categoryName").notEmpty().withMessage("The name of the category IS required."),
    body("categoryDescription").notEmpty().withMessage("The description of the category IS required."),
    validarCampos,
    handleErrors
];

export const deleteCategoryValidator = [
    param("id").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
]

export const updateCategoryValidator = [
    param("id").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
]