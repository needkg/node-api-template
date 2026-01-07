import { query } from "../../infra/database/connection.js";

export async function findUserProfile(userId) {
    const [rows] = await query(
        "SELECT name, email, isActivated FROM users WHERE userId = ?",
        [userId]
    );

    return rows[0]
}