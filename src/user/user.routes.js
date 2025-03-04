import { Router } from "express";
import { deleteUserValidator, updateOnlyClientValidator, updateRoleValidator } from "../middlewares/user-validators.js";
import { deleteUserClientRole, updateOnlyClient, updateRole } from "./user.controller.js";

const router = Router();
//Funcionalidad de ClientRole
router.delete("/deleteUserByClientRole/:uid", deleteUserValidator, deleteUserClientRole);
//Funcionalidad de solo Update Role
router.patch("/updateRole/:uid", updateRoleValidator, updateRole);
//Funcionalidad de solo Update a CLIENT_ROLE
router.patch("/updateOnlyClientRole/:uid", updateOnlyClientValidator, updateOnlyClient);
export default router;