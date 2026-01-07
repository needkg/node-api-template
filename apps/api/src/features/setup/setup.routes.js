import { Router } from "express";
import * as controller from "./setup.controller.js";
import { ensureAdminSetupPending } from "../../shared/middlewares/index.js";

const router = Router();

router.post(
    "/setup/first-admin",
    ensureAdminSetupPending,
    controller.handleCreateFirstAdmin
);

export default router;