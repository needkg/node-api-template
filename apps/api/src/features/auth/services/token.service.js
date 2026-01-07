import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
}