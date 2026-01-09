import { Router } from "express";
import * as controller from "./auth.controller.js";

const router = Router();

router.post(
    "/auth/login",
    controller.processUserAuthentication
);

router.post(
    "/auth/register",
    controller.processUserRegistration
);

router.post(
    "/auth/refresh",
    controller.processUserRefreshToken
);

router.post(
    "/auth/logout",
    controller.processUserLogout
);

export default router;