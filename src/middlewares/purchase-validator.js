import { param } from "express-validator";
import { userExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";

export const newCartRequestValidator = [
    validateJWT,
    param("user").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("user").custom(userExists),
    validarCampos,
    handleErrors
]

export const completeCartRequestValidator = [
    validateJWT,
    param("user").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("user").custom(userExists),
    validarCampos,
    handleErrors
]

export const purchaseHistoryValidator = [
    validateJWT,
    param("user").isMongoId().withMessage("Not a valid MongoDB ID"),
    param("user").custom(userExists),
    validarCampos,
    handleErrors
]