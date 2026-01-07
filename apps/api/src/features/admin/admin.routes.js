import { Router } from "express";
import * as controller from "./admin.controller.js";
import { ensureAuthenticated, ensureUserActivated, requireAdmin } from "#middlewares";

const router = Router();

router.get(
    "/admin/users", 
    ensureAuthenticated,
    ensureUserActivated, 
    requireAdmin, 
    controller.handleListUsers
);

router.patch(
    "/admin/user/:userId/desactivate", 
    ensureAuthenticated, 
    ensureUserActivated, 
    requireAdmin, 
    controller.desactiveUser
);

router.patch(
    "/admin/user/:userId/activete", 
    ensureAuthenticated, 
    ensureUserActivated, 
    requireAdmin, 
    controller.activeUser
);

export default router;