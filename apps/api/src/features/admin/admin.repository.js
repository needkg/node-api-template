import { query } from "../../infra/database/connection.js";

export async function fetchUsers() {
    const [rows] = await query("SELECT id, userId, name, username, email, isActivated, isAdmin FROM users");
    return rows;
}

export async function updateUserActivation(userId, isActivated) {
    await query(
        "UPDATE users SET isActivated = ? WHERE userId = ?",
        [isActivated ? 1 : 0, userId]
    );
}