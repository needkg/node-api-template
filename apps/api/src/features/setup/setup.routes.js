import { Router } from "express";

import { ensureAdminSetupPending } from "#middlewares";

import * as controller from "./setup.controller.js";

const router = Router();

router.post(
    "/setup/first-admin",
    ensureAdminSetupPending,
    controller.handleCreateFirstAdmin
);

export default router;