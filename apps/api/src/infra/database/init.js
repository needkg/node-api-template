import pool from "./connection.js";
import setupDatabase from "./setup.js";

export async function initDatabase() {
    try {
        await pool.query("SELECT 1");

        console.log("✅ Database connected successfully");

        await setupDatabase();

    } catch (error) {
        console.error("❌ Database initialization failed: " + error.message);
        throw new Error("Database initialization error: " + error.message);
    }
}

export default initDatabase;
