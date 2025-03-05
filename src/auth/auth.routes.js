import { Router } from "express"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { loginAdminValidator, loginClientValidator, registerValidator } from "../middlewares/user-validators.js"
import { loginAdmin, loginClient, register } from "./auth.controller.js"

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    register
)

//SI SE LLEGA A INICIAR SESION CON UN ROLE CLIENT SALDRA
// "Solo los administradores pueden iniciar sesión aquí"
router.post(
    "/loginAdmin",
    loginAdminValidator,
    loginAdmin
)
//SI SE LLEGA A INICIAR SESION CON UN ROLE ADMIN SALDRA
// "Solo los clientes pueden iniciar sesión aquí"
router.post(
    "/loginClient",
    loginClientValidator,
    loginClient
)
export default router;