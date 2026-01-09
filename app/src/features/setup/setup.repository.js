import { query } from "../../infra/database/connection.js";

export async function createAdminUser(userId, name, username, email, hashedPassword) {
    await query(
        "INSERT INTO users (user_id, name, username, email, password, is_activated, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [userId, name, username, email, hashedPassword, true, true]
    );
}

export async function markAdminSetupAsCompleted() {
    await query(
        "UPDATE system_state SET value = 'created' WHERE `key` = 'setup.admin'"
    );
}