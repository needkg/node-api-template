import { query } from "../../infra/database/connection.js";

export async function createAdminUser(userId, name, username, email, hashedPassword) {
    await query(
        "INSERT INTO users (user_id, name, username, email, password, is_activated, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [userId, name, username, email, hashedPassword, true, "admin"]
    );

    return {
        name,
        username,
        email
    }
}

export async function markAdminSetupAsCompleted() {
    await query(
        "UPDATE system_state SET value = 'created' WHERE `key` = 'setup.admin'"
    );
}