import { Router } from "express";

import { ensureAuthenticated, ensureUserActivated } from "#middlewares";

import * as controller from "./user.controller.js";

const router = Router();

router.get(
    "/user/profile", 
    ensureAuthenticated, 
    ensureUserActivated, 
    controller.handleUserProfile
);

export default router;