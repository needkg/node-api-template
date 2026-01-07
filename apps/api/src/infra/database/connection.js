import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

//const configPath = path.resolve("config/database.json");

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "testdb";
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

//const pool = mysql.createPool({
//    
//    waitForConnections: true,
//    connectionLimit: 10,
//    queueLimit: 0
//});

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function query(sql, params = []) {
    try {
        const result = await pool.query(sql, params);
        return result;
    } catch (error) {
        console.error("DB QUERY ERROR:", {
            sql,
            params,
            message: error.message
        });
        throw error;
    }
}

export async function getSystemStateByKey(key) {
    const [rows] = await query(
        "SELECT * FROM system_state WHERE `key` = ?",
        [key]
    );
    return rows[0];
}

export default pool;