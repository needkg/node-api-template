import { query } from "../../infra/database/connection.js";

export async function findUserProfile(userId) {
    const [rows] = await query(
        "SELECT name, email, isActivated FROM users WHERE userId = ?",
        [userId]
    );

    return rows
}

export async function updateUserById(userId, name, username, email) {
    await query(
        "UPDATE users SET name = ?, username = ?, email = ? WHERE userId = ?",
        [name, username, email, userId]
    );
}