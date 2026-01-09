import { verifyAccessToken } from "../jwt/jwt.service.js";

export async function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Authorization header not provided"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Invalid or expired token"
        });
    }
}