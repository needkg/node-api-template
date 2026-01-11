import { query } from "../../infra/database/connection.js";

export async function findUserProfile(userId) {
    const rows = await query(
        "SELECT name, username, email, is_activated, role, created_at FROM users WHERE user_id = ?",
        [userId]
    );

    return rows[0];
}

export async function findUser(userId) {
    const rows = await query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId]
    );

    return rows[0];
}

export async function updateUserPasswordById(userId, hashedPassword) {
    await query(
        "UPDATE users SET password = ? WHERE user_id = ?",
        [hashedPassword, userId]
    );
}

export async function updateUserById(userId, name, username, email, language) {
    await query(
        "UPDATE users SET name = ?, username = ?, email = ?, language = ? WHERE user_id = ?",
        [name, username, email, language, userId]
    );

    return await findUserProfile(userId);
}