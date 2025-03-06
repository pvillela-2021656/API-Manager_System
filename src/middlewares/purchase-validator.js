import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";

export const newCartRequestValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]