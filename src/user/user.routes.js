import { Router } from "express";
import { deleteUserValidator, updateRoleValidator } from "../middlewares/user-validators.js";
import { deleteUserClientRole, updateRole } from "./user.controller.js";

const router = Router()
//Funcionalidad de ClientRole
router.delete("/deleteUserByClientRole/:uid", deleteUserValidator, deleteUserClientRole)
//Funcionalidad de solo Update Role
router.patch("/updateRole/:uid", updateRoleValidator, updateRole)
    
export default router;