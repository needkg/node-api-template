import { Router } from "express";

import { ensureAuthenticated, ensureUserActivated, requireAdmin } from "../../shared/middlewares/index.js";

import * as controller from "./admin.controller.js";

const router = Router();

router.get(
    "/admin/users", 
    ensureAuthenticated,
    ensureUserActivated, 
    requireAdmin, 
    controller.handleListUsers
);

router.put(
    "/admin/users/:userId", 
    ensureAuthenticated, 
    ensureUserActivated, 
    requireAdmin, 
    controller.handleUpdateUser
);

export default router;