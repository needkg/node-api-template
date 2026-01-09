import { query } from "../../infra/database/connection.js";

export async function saveRefreshToken(userId, refreshToken, expiresAt) {
    await query(
        "INSERT INTO refresh_tokens (userId, token, expiresAt) VALUES (?, ?, ?)",
        [userId, refreshToken, expiresAt]
    );
}

export async function findRefreshTokenByUserId(userId) {
    const [result] = await query(
        "SELECT token FROM refresh_tokens WHERE userId = ?",
        [userId]
    );
    return result;
}

export async function revokeRefreshToken(token) {
    await query(
        "UPDATE refresh_tokens SET revoked = true WHERE token = ?",
        [token]
    );
}

export async function revokeAllRefreshTokens(userId) {
    await query(
        "UPDATE refresh_tokens SET revoked = true WHERE userId = ?",
        [userId]
    );
}