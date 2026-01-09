import { query } from "../../infra/database/connection.js";

export async function findUserByEmail(email) {
    const [result] = await query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return result || null;
}

export async function createUser(user) {
    await query(
        "INSERT INTO users (userId, name, username, email, password, isActivated) VALUES (?, ?, ?, ?, ?, ?)",
        [
            user.userId,
            user.name, 
            user.username, 
            user.email, 
            user.password, 
            user.isActivated
        ]
    );
}

export async function saveRefreshToken(userId, refreshToken, expiresAt) {
    await query(
        "INSERT INTO refresh_tokens (userId, token, expiresAt) VALUES (?, ?, ?)",
        [userId, refreshToken, expiresAt]
    );
}

export async function findRefreshToken(token) {
    const [result] = await query(
        "SELECT * FROM refresh_tokens WHERE token = ?",
        [token]
    );
    return result;
}

export async function revokeRefreshToken(token) {
    await query(
        "UPDATE refresh_tokens SET revoked = true WHERE token = ?",
        [token]
    );
}

export async function revokeAllTokensByUser(userId) {
    await query(
        "UPDATE refresh_tokens SET revoked = true WHERE userId = ?",
        [userId]
    );
}