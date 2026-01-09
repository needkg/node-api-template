import { query } from "../../infra/database/connection.js";

export async function getUserAuthDataByEmail(email) {
    const [result] = await query(
        "SELECT userId, password FROM users WHERE email = ?",
        [email]
    );

    return result || null;
}

export async function createUser(user) {
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