import { body, param } from "express-validator";
import { emailExists, userExists, usernameExists } from "../helpers/db-validators.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("The username is required"),
    body("email").notEmpty().withMessage("The email is required"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("Not a valid ID of mongo"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];
//Funcionalidad de ClientRole
export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("Not a valid mongoDB ID"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]
//Funcionalidad de solo Update Role
export const updateRoleValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("role").optional().isString().withMessage("Role is wrong"),
    validarCampos,
    handleErrors
]
//Funcionalidad de solo Update a CLIENT_ROLE
export const updateOnlyClientValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("role").optional().isString().withMessage("Role is wrong"),
    validarCampos,
    handleErrors
]