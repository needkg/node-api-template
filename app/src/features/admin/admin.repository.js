import { query } from "../../infra/database/connection.js";

export async function findUsers() {

    const sql = `
        SELECT id, user_id, name, username, email, is_activated, role, created_at FROM users
    `;

    const result = await query(sql);

    return result;
}

export async function updateUserById(userId, name, username, email, isActivated, role) {

    const sql = `
        UPDATE users SET name = ?, username = ?, email = ?, is_activated = ?, role = ? WHERE user_id = ?
    `;

    await query(sql, [name, username, email, isActivated, role, userId]);
}