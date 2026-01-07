import { Router } from "express";
import * as controller from "./user.controller.js";
import { ensureAuthenticated, ensureUserActivated } from "#middlewares";

const router = Router();

router.get(
    "/user/profile", 
    ensureAuthenticated, 
    ensureUserActivated, 
    controller.handleUserProfile
);

export default router;