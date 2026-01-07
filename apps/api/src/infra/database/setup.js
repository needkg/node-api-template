import { query } from "./connection.js";

export async function createUsersTable() {
    const createUsersTable = `
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
        await query(createUsersTable);
        console.log("Tabela users criada ou já existente ✅");
    } catch (err) {
        console.error("Erro ao criar tabela users:", err.message);
    }
}

export async function createSystemStateTable() {
    const createSystemStateTable = `
    CREATE TABLE IF NOT EXISTS system_state (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(100) NOT NULL UNIQUE,
        value VARCHAR(255) NOT NULL,
        type ENUM('string', 'number', 'boolean', 'json') NOT NULL DEFAULT 'string',
        description TEXT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP
    );
    `;

    try {
        await query(createSystemStateTable);
        console.log("Tabela system_state criada ou já existente ✅");
    } catch (err) {
        console.error("Erro ao criar tabela system_state:", err.message);
    }
}

export async function seedInitialSetupStates() {
    const insertStates = `
    INSERT IGNORE INTO system_state (\`key\`, value, type, description)
    VALUES
        ('setup.admin', 'pending', 'string', 'Criação do usuário administrador');
    `;

    try {
        await query(insertStates);
        console.log("Estados iniciais do setup inseridos na tabela system_state ✅");
    } catch (err) {
        console.error("Erro ao inserir estados iniciais do setup:", err.message);
    }
}

export async function setupDatabase() {
    await createUsersTable();
    await createSystemStateTable();
    await seedInitialSetupStates();
}

export default setupDatabase;