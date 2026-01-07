import { query } from "../../infra/database/connection.js";

export async function insertAdminUser(userId, name, username, email, hashedPassword) {
    await query(
        "INSERT INTO users (userId, name, username, email, password, isActivated, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [userId, name, username, email, hashedPassword, true, true]
    );
}

export async function markAdminSetupAsCompleted() {
    await query(
        "UPDATE system_state SET value = 'created' WHERE `key` = 'setup.admin'"
    );
}