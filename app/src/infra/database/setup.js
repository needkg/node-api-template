import { query } from "./connection.js";

export async function createUsersTable() {
    const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id CHAR(36) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_activated TINYINT(1) NOT NULL DEFAULT 1,
        is_admin TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;

    try {
        await query(createUsersTableSql);
        console.info("[INFO] Users table ensured successfully");
    } catch (err) {
        console.error("[ERROR] Failed to create users table:", err.message);
        throw err;
    }
}

export async function createRefreshTokensTable() {
    const createRefreshTokensTableSql = `
    CREATE TABLE IF NOT EXISTS refresh_tokens (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        user_id CHAR(36) NOT NULL,
        token CHAR(255) NOT NULL,

        revoked BOOLEAN NOT NULL DEFAULT FALSE,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_user_id (user_id),
        INDEX idx_token (token),
        INDEX idx_expires_at (expires_at),
        INDEX idx_revoked (revoked)
    );
    `;

    try {
        await query(createRefreshTokensTableSql);
        console.info("[INFO] Refresh tokens table ensured successfully");
    } catch (err) {
        console.error("[ERROR] Failed to create refresh_tokens table:", err.message);
        throw err;
    }
}

export async function createSystemStateTable() {
    const createSystemStateTableSql = `
    CREATE TABLE IF NOT EXISTS system_state (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(100) NOT NULL UNIQUE,
        value VARCHAR(255) NOT NULL,
        type ENUM('string', 'number', 'boolean', 'json') NOT NULL DEFAULT 'string',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;

    try {
        await query(createSystemStateTableSql);
        console.info("[INFO] System state table ensured successfully");
    } catch (err) {
        console.error("[ERROR] Failed to create system_state table:", err.message);
        throw err;
    }
}

export async function seedInitialSetupStates() {
    const insertStatesSql = `
    INSERT IGNORE INTO system_state (\`key\`, value, type)
    VALUES
        ('setup.admin', 'pending', 'string');
    `;

    try {

        await query(insertStatesSql);

        console.info("[INFO] Initial setup states ensured successfully");
    } catch (err) {
        console.error("[ERROR] Failed to insert initial setup states:", err.message);
         throw err;
    }
}

export async function setupDatabase() {
    console.info("[INFO] Starting database setup");

    await createUsersTable();
    await createRefreshTokensTable();
    await createSystemStateTable();
    await seedInitialSetupStates();

    console.info("[INFO] Database setup completed successfully");
}

export default setupDatabase;