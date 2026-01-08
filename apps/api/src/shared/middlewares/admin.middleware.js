import { query } from "../../infra/database/connection.js";

export async function requireAdmin(req, res, next) {
    try {
        const [rows] = await query(
            "SELECT isAdmin FROM users WHERE userId = ?",
            [req.user.userId]
        );

        req.user.isAdmin = rows ? rows.isAdmin === 1 : false;

        if (!req.user.isAdmin) {
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
            message: err.message
        });
    }
}
