import { verifyToken } from "../auth/jwt.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Token not provided"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verifyToken(token);
        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Invalid or expired token"
        });
    }
}