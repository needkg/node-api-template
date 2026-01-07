import { query } from "../../infra/database/connection.js";

export async function ensureUserActivated(req, res, next) {
    try {
        const [rows] = await query(
            "SELECT isActivated FROM users WHERE userId = ?",
            [req.user.userId]
        );

        req.user.isActivated = rows[0] ? rows[0].isActivated === 1 : false;

        if (!req.user.isActivated) {
            return res.status(403).json({
                status: 403,
                error: "Forbidden",
                message: "User is disabled"
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: err.message
        });
    }
}