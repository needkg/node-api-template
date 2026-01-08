import { query } from "./connection.js";

export async function createUsersTable() {
    const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId CHAR(36) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isActivated TINYINT(1) NOT NULL DEFAULT 1,
        isAdmin TINYINT(1) NOT NULL DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

export async function createSystemStateTable() {
    const createSystemStateTableSql = `
    CREATE TABLE IF NOT EXISTS system_state (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(100) NOT NULL UNIQUE,
        value VARCHAR(255) NOT NULL,
        type ENUM('string', 'number', 'boolean', 'json') NOT NULL DEFAULT 'string',
        description TEXT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    INSERT IGNORE INTO system_state (\`key\`, value, type, description)
    VALUES
        ('setup.admin', 'pending', 'string', 'Criação do usuário administrador');
    `;

    try {

        const result = await query(insertStatesSql);

        if (result.affectedRows > 0) {
          console.info("[INFO] Initial setup states inserted into system_state table");
        } else {
          console.warn("[WARN] Initial setup states already exist, skipping");
        }
    } catch (err) {
        console.error("[ERROR] Failed to insert initial setup states:", err.message);
         throw err;
    }
}

export async function setupDatabase() {
    console.info("[INFO] Starting database setup");

    await createUsersTable();
    await createSystemStateTable();
    await seedInitialSetupStates();

    console.info("[INFO] Database setup completed successfully");
}

export default setupDatabase;