import { body, param } from "express-validator";
import { categoryExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";


export const newCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("categoryName").notEmpty().withMessage("The name of the category IS required."),
    body("categoryDescription").notEmpty().withMessage("The description of the category IS required."),
    validarCampos,
    handleErrors
];

export const listCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
]