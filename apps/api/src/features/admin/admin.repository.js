import { query } from "../../infra/database/connection.js";

export async function findUsers() {
    const rows = await query("SELECT id, userId, name, username, email, isActivated, isAdmin FROM users");
    return rows;
}

export async function updateUserById(userId, name, username, email, isActivated, isAdmin) {
    await query(
        "UPDATE users SET name = ?, username = ?, email = ?, isActivated = ?, isAdmin = ? WHERE userId = ?",
        [name, username, email, isActivated, isAdmin, userId]
    );
}