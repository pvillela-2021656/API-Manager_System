import { body, param } from "express-validator"
import { productExists } from "../helpers/db-validators.js"
import { handleErrors } from "./handle_errors.js"
import { validarCampos } from "./validate-fields.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const newProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("productName").notEmpty().withMessage("The name of the product IS required."),
    body("productCategory").notEmpty().withMessage("The category of the product IS required."),
    body("productDescription").notEmpty().withMessage("The description of the product IS required."),
    body("productPrice").notEmpty().withMessage("The price of the product IS required."),
    body("productStock").notEmpty().withMessage("The stock of the product IS required."),
    validarCampos,
    handleErrors
]

export const listProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const listOneProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("id").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("id").custom(productExists),
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("id").custom(productExists),
    body("productName").notEmpty().withMessage("The name of the product IS required."),
    body("productCategory").notEmpty().withMessage("The category of the product IS required."),
    body("productDescription").notEmpty().withMessage("The description of the product IS required."),
    body("productPrice").notEmpty().withMessage("The price of the product IS required."),
    body("productStock").notEmpty().withMessage("The stock of the product IS required."),
    validarCampos,
    handleErrors
]

export const findOutOfStockValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const mostSelledValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("id").custom(productExists),
    validarCampos,
    handleErrors
]