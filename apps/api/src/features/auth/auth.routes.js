import { Router } from "express";

import * as controller from "./auth.controller.js";

const router = Router();

router.post(
    "/auth/login",
    controller.processUserAuthentication
);

router.post(
    "/auth/register",
    controller.proccessUserRegistration
);

export default router;