import { query } from "../../infra/database/connection.js";

export async function findUserByEmail(email) {
    const result = await query(
        "SELECT userId, name, username, email, password, isActivated, isAdmin FROM users WHERE email = ?",
        [email]
    );
    return result[0] || null;
}

export async function insertUser(user) {
    await query(
        "INSERT INTO users (userId, name, username, email, password, isActivated) VALUES (?, ?, ?, ?, ?, ?)",
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