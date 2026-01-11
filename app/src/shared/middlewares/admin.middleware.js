import { query } from "../../infra/database/connection.js";

export async function requireAdmin(req, res, next) {
    try {
        const rows = await query(
            "SELECT role FROM users WHERE user_id = ?",
            [req.user.sub]
        );

        req.user.role = rows[0] ? rows[0].role : null;
        if (req.user.role !== "admin") {
            return res.status(403).json({
                status: 403,
                error: "Forbidden",
                message: "Admin access required"
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: err.message || "Authorization check failed"
        });
    }
}
