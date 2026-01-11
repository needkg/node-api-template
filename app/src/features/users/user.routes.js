import { Router } from "express";

import { ensureAuthenticated, ensureUserActivated } from "../../shared/middlewares/index.js";

import * as controller from "./user.controller.js";

const router = Router();

router.get(
    "/user/me", 
    ensureAuthenticated, 
    ensureUserActivated, 
    controller.handleUserProfile
);

router.patch(
    "/user/me",
    ensureAuthenticated,
    ensureUserActivated,
    controller.handleUpdateUserProfile
);

export default router;