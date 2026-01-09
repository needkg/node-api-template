import { query } from "../../infra/database/connection.js";

export async function findUsers() {
    const rows = await query(
        "SELECT id, user_id, name, username, email, is_activated, is_admin FROM users"
    );
    return rows;
}

export async function updateUserById(userId, name, username, email, isActivated, isAdmin) {
    await query(
        "UPDATE users SET name = ?, username = ?, email = ?, is_activated = ?, is_admin = ? WHERE user_id = ?",
        [name, username, email, isActivated, isAdmin, userId]
    );
}