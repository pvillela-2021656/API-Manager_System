import { body, param } from "express-validator"
import { productExists } from "../helpers/db-validators.js"
import { handleErrors } from "./handle_errors.js"
import { validarCampos } from "./validate-fields.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const newProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("productName", "Product name is required").notEmpty(),
    body("productCategory", "Product category is required").notEmpty(),
    body("productDescription", "Product description is required").notEmpty(),
    body("productPrice", "Product price is required").notEmpty(),
    body("productStock", "Product stock is required").notEmpty(),
    validarCampos,
    handleErrors
]

export const listProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const listOneProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("id").custom(productExists),
    validarCampos,
    handleErrors
]