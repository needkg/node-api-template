import pool from "./connection.js";

export async function connectDatabase() {
    try {
        console.info("[INFO] Connecting to database");

        await pool.query("SELECT 1");

        console.info("[INFO] Database connected successfully");

    } catch (error) {
        console.error("[ERROR] Database connection failed:", error);
        throw error;
    }
}
