import { verifyAccessToken } from "../security/token.service.js";

export async function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Authorization header is required"
        });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Invalid authorization format"
        });
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Invalid or expired access token"
        });
    }
}