import { findSystemStateByKey } from "../../infra/database/connection.js";

export async function ensureAdminSetupPending(req, res, next) {
    const setupState = await findSystemStateByKey("setup.admin");

    if (setupState && setupState.value === "pending") {
        return next();
    }

    return res.status(403).json({
        status: 403,
        error: "Forbidden",
        message: "Setup already completed"
    });
}