import { query } from "../../infra/database/connection.js";

export async function findUserByLogin(login) {

    const sql = `
        SELECT user_id, name, username, email, role, password, is_activated FROM users WHERE username = ? OR email = ? LIMIT 1
    `;
    const rows = await query(sql, [login, login]);
    return rows[0];
}

export async function createUser(user) {

    const sql = `
        INSERT INTO users (user_id, name, username, email, password, is_activated) VALUES (?, ?, ?, ?, ?, ?)
    `;

    await query(sql, [
        user.userId,
        user.name,
        user.username,
        user.email,
        user.password,
        user.isActivated
    ]);

    return { 
        userId: user.userId,
        name: user.name,
        username: user.username,
        email: user.email,
        isActivated: user.isActivated
    };
}

export async function saveRefreshToken(userId, refreshToken, expiresAt) {
    await query(
        "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
        [userId, refreshToken, expiresAt]
    );
}

export async function findRefreshTokenByUserId(userId) {
    const result = await query(
        "SELECT token FROM refresh_tokens WHERE user_id = ?",
        [userId]
    );
    return result[0];
}

export async function revokeRefreshToken(token) {
    await query(
        "UPDATE refresh_tokens SET revoked = true WHERE token = ?",
        [token]
    );
}

export async function revokeAllRefreshTokens(userId) {
    await query(
        "UPDATE refresh_tokens SET revoked = true WHERE user_id = ?",
        [userId]
    );
}