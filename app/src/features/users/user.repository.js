import { query } from "../../infra/database/connection.js";

export async function findUserProfile(userId) {
    const [rows] = await query(
        "SELECT name, email, is_activated FROM users WHERE user_id = ?",
        [userId]
    );

    return rows
}

export async function updateUserById(userId, name, username, email) {
    await query(
        "UPDATE users SET name = ?, username = ?, email = ? WHERE user_id = ?",
        [name, username, email, userId]
    );
}