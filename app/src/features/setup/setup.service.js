import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import * as repository from "./setup.repository.js";

export async function createFirstAdmin(name, username, email, password) {

    const userId = randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await repository.createAdminUser(userId, name, username, email, hashedPassword);

    await repository.markAdminSetupAsCompleted()

    return user;
}