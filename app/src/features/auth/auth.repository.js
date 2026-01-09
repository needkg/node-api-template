import { query } from "../../infra/database/connection.js";

export async function getUserAuthDataByEmail(email) {
    const [result] = await query(
        "SELECT user_id, password, is_activated FROM users WHERE email = ?",
        [email]
    );

    return result || null;
}

export async function createUser(user) {
    await query(
        "INSERT INTO users (user_id, name, username, email, password, is_activated) VALUES (?, ?, ?, ?, ?, ?)",
        [
            user.userId,
            user.name, 
            user.username, 
            user.email, 
            user.password, 
            user.isActivated
        ]
    );
}